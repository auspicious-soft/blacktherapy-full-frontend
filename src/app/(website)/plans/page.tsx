import ViewPlans from '@/app/customer/components/ViewPlans'
import React from 'react'

const Plans = () => {
    return (
        <div className='lg:mx-[200px] mb-14 mx-[50px]'>
            <h1 className='text-[40px] text-center py-10'>What type of support do you need?</h1>
            <ViewPlans hideLogout={true} hideSelectYourPlanText = {true} onPlansPageWebsite = {true}/>
        </div>
    )
}

export default Plans