"use client"
import stripe from '@/config/stripe';
import { getStripeProductNameById } from '@/utils';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export interface BillingData {
    id: string;
    start_date: any;
    current_period_end: any;
    plan: {
        interval: string;
        amount: number;
        product: string;
    }
    subscriptionType: string;
    billingAmount: string;
    productName: string;
}
interface BillingDetailsProps {
    hasMore: boolean;
    billingData: BillingData[]
}

const BillingDetails = (props: BillingDetailsProps) => {
    const { hasMore, billingData } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10

    // Pagination handler
    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const paginatedData = billingData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
    const [dataWithProductNameArray, setDataWithProductNameArray] = useState<BillingData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataWithProductName = await Promise.all(paginatedData.map(async (row) => {
                const productName = await getStripeProductNameById(row.plan.product);
                return { ...row, productName };
            }))
            setDataWithProductNameArray(dataWithProductName);
        }
        fetchData()
    }, [])

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
                            dataWithProductNameArray.length > 0 &&
                            dataWithProductNameArray.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{row.id}</td>
                                        <td>{new Date(row.start_date * 1000).toLocaleDateString('en-US')}</td>
                                        <td>{new Date(row.current_period_end * 1000).toLocaleDateString('en-US')}</td>
                                        <td>{row.productName}</td>
                                        <td className='capitalize'>{row.plan.interval}<span>ly</span></td>
                                        <td>${row.plan.amount / 100}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            paginatedData.length === 0 &&
                            <tr>
                                <td colSpan={6} className='text-center'>No data found</td>
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