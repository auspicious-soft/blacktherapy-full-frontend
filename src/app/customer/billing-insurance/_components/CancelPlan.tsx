import { cancelSubscriptionService } from '@/services/client/client-service'
import React, { SetStateAction } from 'react'
import { toast } from 'sonner'
import Stripe from 'stripe'
import { KeyedMutator } from 'swr'

interface CancelPlanProps {
    currentPlanOrSubscriptionId: string
    handleClose: (value: SetStateAction<boolean>) => void
    userId: string
}


const CancelPlan = (props: CancelPlanProps) => {
    const [isPending, startTransition] = React.useTransition()
    const { currentPlanOrSubscriptionId, handleClose, userId} = props
    const cancelSubscription = async () => {
        startTransition(async () => {
            try {
                const response = await cancelSubscriptionService(`/client/${userId}/cancel-subscription/${currentPlanOrSubscriptionId}`)
                if (response?.data?.success) {
                    toast.success('Subscription cancelled successfully')
                    window.location.reload()
                }
            } catch (error) {
                toast.error('Error cancelling subscription')
            }
        })
    }
    return (
        <div>
            <p className="text-[#283C63] text-[20px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">Are you sure you want to cancel your subscription?</p>
            <div className='flex w-full '>
                <button disabled={isPending} onClick={cancelSubscription} className='bg-[#FFD899] mr-4'>
                    {isPending ? 'Canceling Subscription...' : 'Yes, I want to cancel my subscription'}
                </button>
                <button className='bg-[#FFBBCD] ml-4' onClick={() => handleClose(false)}>
                    No, I want to keep my subscription
                </button>
            </div>
        </div>
    )
}

export default CancelPlan