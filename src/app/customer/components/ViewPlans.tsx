'use client'
import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutForm from '../components/upgrade-plan/CheckoutForm'
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getClientSecretToShowPaymentIntentService } from '@/services/client/client-service';
import { getStripePk } from '@/actions';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import ReactLoading from 'react-loading';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ButtonSvg } from '@/utils/svgicons';
import Link from 'next/link';

const ViewPlans = (props: any) => {
  const { modalRef, hideLogout = false, hideSelectYourPlanText = false, onPlansPageWebsite = false } = props;
  const session = useSession();
  const [plan, setPlan] = useState<string>("");
  const [interval, setInterval] = useState<string>("");
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();
  const initializeStripe = async () => {
    try {
      const publishableKey = await getStripePk();
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
    initializeStripe()
  }, [])

  // Add this new useEffect to handle scrolling after checkout is shown
  useEffect(() => {
    if (showCheckout && modalRef?.current) {
      // Add a small delay to ensure all content is rendered, including Stripe elements
      setTimeout(() => {
        const container = modalRef.current;
        const scrollDistance = container?.scrollHeight - container?.clientHeight;
        container.scrollTo({
          top: scrollDistance,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [showCheckout, modalRef]);

  const handlePlanSelect = async (selectedPlan: string, selectedInterval: string) => {
    setPlan(selectedPlan);
    setInterval(selectedInterval);

    if (!session?.data?.user?.id) {
      toast.error('Please sign in to select a plan');
      return;
    }

    setLoading(true);
    try {
      const response = await getClientSecretToShowPaymentIntentService(`/client/create-subscription/${session?.data?.user?.id}`, {
        email: session?.data?.user?.email,
        name: session?.data?.user?.name,
        interval: selectedInterval,
        planType: selectedPlan,
      })
      if (!response?.data?.status) {
        toast.error('Failed to create subscription')
        return
      }
      const data = response?.data
      setClientSecret(data?.clientSecret)
      setShowCheckout(true);
    }
    catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create subscription')
      toast.error('Error initializing subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleRadioChange = (selectedPlan: string, selectedInterval: string) => {
    handlePlanSelect(selectedPlan, selectedInterval);
  };

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <ReactLoading type={'spin'} color={'#26395e'} height={'50px'} width={'50px'} />
        <p className="mt-4">Getting the payments...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login');
  };
  return (
    <div className="ma" ref={modalRef}>
      <div className='flex justify-between items-center'>
        {!hideSelectYourPlanText && <h2 className='mb-5'>Select your Plan</h2>}
        {!hideLogout && <a onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}> <LogOut className='text-black' /> <span className="text-[#283C63] text-[600] font-bold">Log Out</span> </a>}
      </div>
      <div className='gap-[30px] grid md:grid-cols-2 grid-cols-1 '>
        {/* Stay Rooted Plan */}
        <div className='bg-white rounded-[20px]'>
          <div className='bg-[#0A1C42] rounded-tl-[20px] rounded-br-[50px] py-[26px] px-[40px] max-w-[396px]'>
            <h3 className='text-white leading-7 text-[24px]'>Stay Rooted Plan</h3>
            <p className='text-white'>Stay Grounded, Stay strong.</p>
          </div>
          <div className='px-[40px] py-7'>
            <h5 className='mb-2.5 font-bold'>Perfect for:</h5>
            <p>Clients who want foundational support with consistent check-ins.</p>
            <h5 className='mt-[23px] mb-2.5 font-bold'>What&apos;s included:</h5>
            <p>1 Video Session per week (50 minutes)</p>
            <ul className='plan-lists my-8'>
              <li>Unlimited messaging with a 24-hours response time.</li>
              <li>Access to mental health resources (e.g., meditation guides and wellness Tips)</li>
            </ul>
            {!onPlansPageWebsite && <h5 className='font-bold mb-2.5'>Select plan duration</h5>}
            <label className='flex items-center gap-5 text-[#686C78] cursor-pointer'>
              {!onPlansPageWebsite && <input
                type="radio"
                checked={plan === 'stayRooted' && interval === 'week'}
                onChange={() => handleRadioChange('stayRooted', 'week')}
                className='w-[20px] h-[20px] accent-[#26395E]'
              />}
              <span> Weekly <span className='font-bold text-[#26395E]'>(Billed $85)</span></span>
            </label>
            {onPlansPageWebsite && <Link href="/getstarted" rel="" className="mt-6 text-white bg-[#283c63] flex items-center justify-center gap-3 p-4 px-5 font-normal rounded-3xl">
              Select Plan<ButtonSvg />
            </Link>}
          </div>

        </div>

        {/* Glow Up Plan */}
        <div className='bg-white rounded-[20px]'>
          <div className='bg-[#0A1C42] rounded-tl-[20px] rounded-br-[50px] py-[26px] px-[40px] max-w-[396px]'>
            <h3 className='text-white leading-7 text-[24px]'>Glow Up Plan</h3>
            <p className='text-white'>Shine Bright & Thrive in Your Greatness.</p>
          </div>
          <div className='px-[40px] py-7'>
            <h5 className='mb-2.5 font-bold'>Perfect for:</h5>
            <p>Clients needing more intensive and frequent support.</p>
            <h5 className='mt-[23px] mb-2.5 font-bold'>What&apos;s included:</h5>
            <p>2 Video Session per week (50 minutes)</p>
            <ul className='plan-lists my-8'>
              <li>Unlimited messaging with a 24-hours response time.</li>
              <li>Access to workshops, community forum, wellness resources, and group therapy.</li>
            </ul>
            {!onPlansPageWebsite && <h5 className='font-bold mb-2.5'>Select plan duration</h5>}
            <div className='flex gap-[50px] items-center'>
              <label className='flex items-center gap-5 text-[#686C78] cursor-pointer'>
                {!onPlansPageWebsite && <input
                  type="radio"
                  checked={plan === 'glowUp' && interval === 'week'}
                  onChange={() => handleRadioChange('glowUp', 'week')}
                  className='w-[20px] h-[20px] accent-[#26395E]'
                />}
                <span> Weekly <span className='font-bold text-[#26395E]'>(Billed $125)</span></span>
              </label>
              <label className='flex items-center gap-5 text-[#686C78] cursor-pointer'>
                {!onPlansPageWebsite && <input
                  type="radio"
                  checked={plan === 'glowUp' && interval === 'month'}
                  onChange={() => handleRadioChange('glowUp', 'month')}
                  className='w-[20px] h-[20px] accent-[#26395E]'
                />}
                <span>Monthly <span className='font-bold text-[#26395E]'>(Billed $500)</span></span>
              </label>
            </div>
            {onPlansPageWebsite && <Link href="/getstarted" rel="" className="mt-6 text-white bg-[#283c63] flex items-center justify-center gap-3 p-4 px-5 font-normal rounded-3xl">
              Select Plan<ButtonSvg />
            </Link>}
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      {showCheckout && clientSecret && stripePromise && (
        <div className="mt-8">
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
            />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default ViewPlans;