'use client'
import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutForm from '../components/upgrade-plan/CheckoutForm'
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getClientSecretService } from '@/services/client/client-service';
import { getStripePk } from '@/actions';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import ReactLoading from 'react-loading';


const PlansPage = () => {
  const session = useSession()
  const [plan, setPlan] = useState('stayRooted');
  const [interval, setInterval] = useState('week');
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>()
  const [subscriptionId, setSubscriptionId] = useState<string>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#283c63',
      colorBackground: '#ffffff',
    },
  };

  const initializeStripe = async () => {
    try {
      console.log('Initializing Stripe...');
      const publishableKey = await getStripePk();
      console.log('Got publishable key:', publishableKey ? 'Yes' : 'No');
      if (!publishableKey) {
        throw new Error('No publishable key found');
      }
      setStripePromise(loadStripe(publishableKey));
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      setError('Failed to initialize payment system');
      toast.error('Failed to initialize payment system');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initializeStripe();
  }, []);

  useEffect(() => {
    const createSubscription = async () => {
      if (!session?.data?.user?.id) return;

      setLoading(true);
      try {
       const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: session?.data?.user?.id,
            planType: plan,
            interval,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create subscription');
        }

        const data = await response.json();
        console.log('Subscription created:', data);

        if (!data.clientSecret || !data.subscriptionId) {
          throw new Error('Invalid response from server');
        }

        setClientSecret(data.clientSecret);
        setSubscriptionId(data.subscriptionId);
      } catch (error) {
        console.error('Error creating subscription:', error);
        setError(error instanceof Error ? error.message : 'Failed to create subscription');
        toast.error('Error initializing subscription');
      } finally {
        setLoading(false);
      }
    };

    createSubscription();
  }, [session?.data?.user?.id, plan, interval]);

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading || !stripePromise || !clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <ReactLoading type={'spin'} color={'#26395e'} height={'50px'} width={'50px'} />
        <p className="mt-4">Setting up payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setPlan('stayRooted')}
            className={`px-4 py-2 rounded ${
              plan === 'stayRooted' ? 'bg-[#283C63] text-white' : 'bg-gray-200'
            }`}
          >
            Stay Rooted
          </button>
          <button
            onClick={() => setPlan('glowUp')}
            className={`px-4 py-2 rounded ${
              plan === 'glowUp' ? 'bg-[#283C63] text-white' : 'bg-gray-200'
            }`}
          >
            Glow Up
          </button>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setInterval('week')}
            className={`px-4 py-2 rounded ${
              interval === 'week' ? 'bg-[#283C63] text-white' : 'bg-gray-200'
            }`}
          >
            Weekly
          </button>
          {plan === 'glowUp' && (
            <button
              onClick={() => setInterval('month')}
              className={`px-4 py-2 rounded ${
                interval === 'month' ? 'bg-[#283C63] text-white' : 'bg-gray-200'
              }`}
            >
              Monthly
            </button>
          )}
        </div>
      </div>

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'flat' as const,
              variables: {
                colorPrimary: '#283c63',
                colorBackground: '#ffffff',
              },
            }
          }}
        >
          <CheckoutForm
            clientSecret={clientSecret}
            subscriptionId={subscriptionId!}
            userId={session?.data?.user?.id as string}
            planType={plan}
          />
        </Elements>

      )}
    </div>
  );
}

export default PlansPage;