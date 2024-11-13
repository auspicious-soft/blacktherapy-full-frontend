import { addClientBilling, ClientsBilllingStats } from '@/services/admin/admin-service';
import { CloseIcon } from '@/utils/svgicons';
import React, { useState, useEffect, useTransition } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import useSWR from 'swr';

interface BillingInformationTabProps {
  rowId: string; 
}
interface FormData {
  insuranceVerified: boolean,
  scaleDisount: number,
  billingStatus: string,
  scaleTermsOrNotes: string,
  lastInsuranceCheck: string,
  simplePractice: boolean,
}
const BillingInformationTab: React.FC<BillingInformationTabProps> = ({ rowId }) => {

  const { data, error, isLoading } = useSWR(`/admin/client-billing/${rowId}`, ClientsBilllingStats, {
    revalidateOnFocus: false,
  });

  const billingInfo = data?.data?.data; 
  const [isPending, startTransition] = useTransition();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    insuranceVerified: false,
    scaleDisount: 0,
    billingStatus: '',
    scaleTermsOrNotes: '',
    lastInsuranceCheck: '',
    simplePractice: false,
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'insuranceVerified' || name === 'simplePractice' ? value === 'true' : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await addClientBilling(`/admin/client-billing/${rowId}`, formData); 
        if (response?.status === 201) {
          toast.success("Billing Added Successfully");
          closeModal();
          setFormData({
            insuranceVerified: false,
            scaleDisount: 0,
            billingStatus: '',
            scaleTermsOrNotes: '',
            lastInsuranceCheck: '',
            simplePractice: false,
          });
        } else {
          toast.error("Failed to add billing entry");
        }
      } catch (error) {
        console.error("Error adding billing entry:", error);
        toast.error("An error occurred while adding the billing entry");
      }
    });
  };

  return (
    <div className="">
      <div className='flex justify-end mb-[22px]'>
        <button
          onClick={openModal}
          className="!text-sm !h-[40px] !px-[30px] button">Add New
        </button>
      </div>

      <div className='table-common overflow-custom'>
        <table>
          <thead>
            <tr>
              <th>Insurance Verified</th>
              <th>Scale/Discount</th>
              <th>Billing Status</th>
              <th>Scale Terms/Note</th>
              <th>Last Insurance Check</th>
              <th>Simple Practice</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
      <tr>
        <td colSpan={5} className="">Loading...</td>
      </tr>
    ) : error ? (
      <tr>
        <td colSpan={5} className="text-center text-red-500">Error loading payments data.</td>
      </tr>
    ) :billingInfo?.length > 0 ? (
            billingInfo?.map((row: any) => (
              <tr key={row?._id}>
                <td>{row?.insuranceVerified ? 'Yes' : 'No'}</td>
                <td>{row?.scaleDisount || 'N/A'}</td>
                <td>{row?.billingStatus}</td>
                <td>{row?.scaleTermsNote || 'N/A'}</td>
                <td>{row?.lastInsuranceCheck ? 'Yes' : 'No'}</td>
                <td>{row?.simplePractice ? 'Yes' : 'No'}</td>
                <td>{new Date(row?.createdAt).toLocaleDateString('en-US')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='w-full flex justify-center p-3 items-center' colSpan={5} >No data found</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full max-h-[90vh] overflow-auto"
        overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div className="flex items-center justify-between rounded-t-[20px] p-5 md:py-[25px] md:px-[35px] bg-[#283C63]">
          <h2 className="font-gothamMedium !text-white">Add New</h2>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='bg-white p-5 md:px-[35px] md:py-10'>
          <div className="grid md:grid-cols-2 gap-4 md:gap-[30px]">
            <div>
              <label className="block mb-2">Insurance Verified</label>
              <select name="insuranceVerified"
                value={formData.insuranceVerified ? 'true' : 'false'}
                onChange={handleInputChange}>
                  <option value="" disabled>--Select-</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
            </div>
            <div>
              <label className="block mb-2">Scale/Discount</label>
              <input
                type="number"
                name="scaleDisount"
                value={formData.scaleDisount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Billing Status</label>
             <select
                name="billingStatus"
                value={formData.billingStatus}
                onChange={handleInputChange}
              >
                <option value="" disabled>--Select--</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Scale Terms/Note</label>
              <input
                type="text"
                name="scaleTermsOrNotes"
                value={formData.scaleTermsOrNotes}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Last Insurance Check</label>
              <input
                type="text"
                name="lastInsuranceCheck"
                value={formData.lastInsuranceCheck}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Entered into Simple Practice</label>
              <select  name="simplePractice"
                value={formData.simplePractice ? 'true' : 'false'}
                onChange={handleInputChange}>
                  <option value="" disabled>--Select--</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
            </div>
          </div>
          <div className='mt-10 flex justify-end'>
            <button type="submit" className="button">Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BillingInformationTab;
