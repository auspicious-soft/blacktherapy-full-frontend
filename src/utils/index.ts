import stripe from "@/config/stripe"

export const getStripeProductNameById = async(id: string) => {
    return (await stripe.products.retrieve(id)).name
}

export const getSubscriptionByItsId = async(id: string) => {
    return (await stripe.subscriptions.retrieve(id))
}