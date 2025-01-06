"use client"
import stripe from '@/config/stripe';
import { getStripeProductNameById, getSubscriptionByItsId } from '@/utils';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ReactLoading from "react-loading";
export interface BillingData {
    id: string;
    period_start: any;
    period_end: any;
    plan: {
        interval: string;
        amount: number;
        product: string;
    }
    subscription: string;
    billingAmount: string;
    productName: string;
}
interface BillingDetailsProps {
    hasMore: boolean;
    billingData: BillingData[]
    isLoading: boolean
}

const BillingDetails = (props: BillingDetailsProps) => {
    const { hasMore, billingData } = props;
    const [trigger, setTrigger] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10
    // Pagination handler
    const handlePageClick = (selectedItem: { selected: number }) => {
        setTrigger((prevState) => !prevState)
        setCurrentPage(selectedItem.selected);
    };

    const paginatedData = billingData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
    const [dataWithProductNameArray, setDataWithProductNameArray] = useState<BillingData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataWithProductName = await Promise.all(paginatedData.map(async (row) => {
                const subsDetails: any = await getSubscriptionByItsId(row.subscription)
                const productName = await getStripeProductNameById(subsDetails.plan.product)
                return { ...row, subsDetails, productName }
            }))
            setDataWithProductNameArray(dataWithProductName);
        }
        fetchData()
    }, [trigger])

    return (
        <div>
            <div className="table-common overflo-custom">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Start Date</th>
                            <th>Renewal Date</th>
                            <th>Subscription Type</th>
                            <th>Interval</th>
                            <th>Billing Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataWithProductNameArray.length > 0 ?
                                dataWithProductNameArray.map((row: any, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{row.id}</td>
                                            <td>{new Date(row.period_start * 1000).toLocaleDateString('en-US')}</td>
                                            <td>{new Date(row.subsDetails.current_period_end * 1000).toLocaleDateString('en-US')}</td>
                                            <td>{row.productName}</td>
                                            <td className='capitalize'>{row.subsDetails.plan.interval}<span>ly</span></td>
                                            <td>${row.subsDetails.plan.amount / 100}</td>
                                        </tr>
                                    )
                                })
                                :
                                paginatedData.length === 0 ? <tr>
                                    <td colSpan={6} className='text-center'>No data found</td>
                                </tr>
                                    :
                                    <tr className='p-2'>
                                        <td>
                                            <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} className='w-5 h-5 text-lg m-5' />
                                        </td>
                                    </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-right mt-4">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(billingData?.length / rowsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
                    pageClassName={'text-[#26395e]'}
                    pageLinkClassName={'py-2 px-4 inline-block'}
                    activeClassName={'bg-[#26395e] rounded-[5px] text-white'}
                    previousLinkClassName={'py-2 px-4 inline-block'}
                    nextLinkClassName={'py-2 px-4 inline-block'}
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                />
            </div>
        </div>
    );
};
export default BillingDetails;