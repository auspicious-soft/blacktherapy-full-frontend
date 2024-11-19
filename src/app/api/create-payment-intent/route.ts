import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

type PlanType = 'stayRooted' | 'glowUp';

interface PriceIdConfig {
  stayRooted: {
    week: string;
  };
  glowUp: {
    week: string;
    month: string;
  };
}



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planType, userId, interval = 'week', email, name } = body;

    if (!planType || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const priceIds: PriceIdConfig = {
      stayRooted: {
        week: process.env.NEXT_PUBLIC_STAY_ROOTED_PLAN as string,
      },
      glowUp: {
        week: process.env.NEXT_PUBLIC_GLOW_UP_PLAN as string,
        month: process.env.NEXT_PUBLIC_GLOW_UP_MONTHLY_PLAN as string,
      },
    };

    if (!isPlanType(planType)) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    // Get the price configuration for the selected plan
    const planPrices = priceIds[planType];
    console.log('planPrices:', planPrices);
    
    // Get the specific price for the interval
    const priceId = (planPrices as any)[interval as any];
    console.log('priceId:', priceId);

    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan type or interval" },
        { status: 400 }
      );
    }

    const customer = await stripe.customers.create({
      metadata: {
        userId,
      },
      email: email,
      name: name 
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { 
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        userId,
        planType,
        interval,
        name,
        email,
      },
      expand: ['latest_invoice.payment_intent'],
    });
    
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    console.log('invoice:', invoice);
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
    console.log('paymentIntent:', paymentIntent);
    // const paymentIntent = await stripe.paymentIntents.create({
    //           amount: await getPriceAmountByPriceId(priceId),
    //           currency: 'eur',
    //           payment_method_types: ['card'],
    //})

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Error creating subscription" },
      { status: 500 }
    );
  }
}

// Type guard function to ensure planType is valid
function isPlanType(value: string): value is PlanType {
  return value === 'stayRooted' || value === 'glowUp';
}