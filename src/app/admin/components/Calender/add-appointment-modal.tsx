'use client'
import { SingleValue, MultiValue, ActionMeta } from 'react-select';
import useTherapists from '@/utils/useTherapists'
import useClients from '@/utils/useClients'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState, useTransition } from 'react'
import Modal from 'react-modal'
import { KeyedMutator } from 'swr'
import CustomSelect from '../CustomSelect'
import ReactLoader from '@/components/ReactLoader';
import { toast } from 'sonner';
import { assignAppointmentToClient } from '@/services/admin/admin-service';

interface AppointmentModalProps {
    openAddAppointmentModal: boolean
    setOpenAddAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedSlot: any
    mutate: KeyedMutator<AxiosResponse<any, any>>
}

const AddAppointmentModal = (props: AppointmentModalProps) => {
    const { openAddAppointmentModal, setOpenAddAppointmentModal, selectedSlot, mutate } = props
    const { therapistData } = useTherapists(true)
    const { clientsData } = useClients()
    const [selectedClinician, setSelectedClinician] = useState<any>()
    const [selectedClient, setSelectedClient] = useState<any>()
    const [selectedRow, setSelectedRow] = useState<any>({})
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (selectedSlot) {
            const startDate = new Date(selectedSlot.start);
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(startDate.getDate()).padStart(2, '0');
            const date = `${year}-${month}-${day}`; // Format date as YYYY-MM-DD
            const time = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // Format time in 24-hour format
            setSelectedRow({
                appointmentDate: date,
                appointmentTime: time
            });
        }
    }, [selectedSlot]);


    const handleSelectChange = (selectedOption: SingleValue<any> | MultiValue<any>, actionMeta: ActionMeta<any>) => {
        setSelectedClinician(selectedOption)
    }

    const handleClientChange = (selectedOption: SingleValue<any> | MultiValue<any>, actionMeta: ActionMeta<any>) => {
        setSelectedClient(selectedOption)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const payload = {
            therapistId: selectedClinician?.value,
            appointmentDate: selectedRow.appointmentDate,
            appointmentTime: selectedRow.appointmentTime,
            status: 'Approved',
            clientId: selectedClient?.value,
            peerSupportIds: selectedRow.peerSupportIds.map((peer: any) => peer.value)
        }
        startTransition(async () => {
            try {
                const response = await assignAppointmentToClient(`/admin/appointments`, payload)
                if (response.status === 201) {
                    toast.success("Appointment added successfully to the schedule and an email and text has been sent to the client and therapist")
                    mutate()
                    setOpenAddAppointmentModal(false)
                }
            }
            catch (error) {
                toast.error("An error occurred while updating the assignment");
            }

        })
    }

    return (
        <Modal
            isOpen={openAddAppointmentModal}
            onRequestClose={() => setOpenAddAppointmentModal(false)}
            contentLabel="Edit Event"
            className={`overflow-auto !bg-white rounded-lg w-full max-w-xl p-5 shadow-lg z-[2000] ${openAddAppointmentModal ? 'modal-open' : ''}`}
            overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-[2000] flex justify-center items-center"
        >
            <div className='font-semibold text-[20px] text-black p-2'>Add an Appointment on
                <span className='text-[#283C63]'>
                    {selectedRow.appointmentDate && selectedRow.appointmentTime ? ` [${new Date(selectedRow.appointmentDate).toLocaleDateString('en-US')}] at ${selectedRow.appointmentTime}` : ''}
                </span></div>
            <form className='flex flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col">
                    <CustomSelect
                        name="Assig a Clinician"
                        value={selectedClinician}
                        options={therapistData || []}
                        onChange={handleSelectChange}
                        placeholder="Select a Clinician"
                        required={true}
                    />
                </div>

                <div className="flex flex-col">
                    <CustomSelect
                        name="Client to be assigned"
                        value={selectedClient}
                        options={clientsData || []}
                        onChange={handleClientChange}
                        placeholder="Select a Client"
                        required={true}
                    />
                </div>

                <div className="flex flex-col">
                    <CustomSelect
                        name="Assign Peer Support"
                        value={selectedRow.peerSupportIds}
                        options={therapistData || []}
                        onChange={(selectedOption: SingleValue<any> | MultiValue<any>, actionMeta: ActionMeta<any>) => {
                            setSelectedRow((prev: any) => ({
                                ...prev,
                                peerSupportIds: selectedOption
                            }));
                        }}
                        placeholder="Select Peer Support"
                        isMulti
                        required={false}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="appointmentDate" className="font-medium">
                        Appointment Date
                    </label>
                    <input
                        type="date"
                        id="appointmentDate"
                        value={selectedRow.appointmentDate}
                        // onChange={(e) =>
                        //     setSelectedRow((prev: any) => ({
                        //         ...prev,
                        //         appointmentDate: e.target.value,
                        //     }))
                        // }
                        disabled
                        className="border p-2 rounded"
                        required
                    />
                    <div className="flex flex-col">
                        <label htmlFor="appointmentTime" className="font-medium">
                            Appointment Time
                        </label>
                        <input
                            type="time"
                            id="appointmentTime"
                            value={selectedRow.appointmentTime}
                            // onChange={(e) =>
                            //     setSelectedRow((prev: any) => ({
                            //         ...prev,
                            //         appointmentTime: e.target.value,
                            //     }))
                            // }
                            disabled
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className='flex gap-4 justify-end '>
                        <button type='button' className="px-4 py-2 font-bold  text-black rounded-lg " onClick={() => setOpenAddAppointmentModal(false)}>
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-[#283C63] text-white px-4 py-2 rounded"
                        >
                            {!isPending ? 'Save Changes' : <ReactLoader color="#fff" />}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default AddAppointmentModal