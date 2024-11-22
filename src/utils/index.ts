import stripe from "@/config/stripe"

export const getStripeProductNameById = async (id: string) => {
    return (await stripe.products.retrieve(id)).name
}

export const getSubscriptionByItsId = async (id: string) => {
    return (await stripe.subscriptions.retrieve(id))
}

export const getImageUrlOfS3 = (subPath: string): string => {
    const path = `${process.env.NEXT_PUBLIC_AWS_BUCKET_PATH}${subPath}`
    return path
}