import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'sonner';

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm = ({ clientSecret }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmed?session_id=${clientSecret}`,
        },
      });

      if (result.error) {
        toast.error(result.error.message || 'Subscription failed');
      }
    } catch (error) {
      toast.error('Error processing subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full mt-4 px-4 py-2 bg-[#283C63] text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Subscribe Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;