import { ButtonArrow } from '@/utils/svgicons';
import React, { useState, useTransition, useEffect } from 'react';
import Modal from "react-modal";
import CustomSelect from './CustomSelect';
import { updateAssignments } from '@/services/admin/admin-service';
import { toast } from 'sonner';
import useTherapists from '@/utils/useTherapists';

interface AssignmentProps { 
    isOpen: boolean;
    onRequestClose: () => void;
    row: any;
    mutate: any;
}

const UpdateAssignments: React.FC<AssignmentProps> = ({ isOpen, onRequestClose, row, mutate }) => {


    const { therapistData, isLoading, error } = useTherapists();

    const [selectedClinician, setSelectedClinician] = useState<any>(null);
    const [selectedPeers, setSelectedPeers] = useState<any>([]);
    const [formData, setFormData] = useState({
        message: '',
        workshop: '',
        video: ''
    });
    const [isPending, startTransition] = useTransition();
    const nameState = row?.clientId?.state;
    
    useEffect(() => {
        if (row) {
            setSelectedClinician(row?.therapistId?.firstName && row?.therapistId?.lastName ? 
                { label: `${row?.therapistId?.firstName} ${row?.therapistId?.lastName}` } : null);

            setSelectedPeers(row?.peerSupportIds?.map((peer: any) => ({
                label: `${peer?.firstName} ${peer?.lastName}`,
                state: peer?.state
            })) || []);

            setFormData({
                message: row?.message !== undefined ? row?.message.toString() : '',
                workshop: row?.workshop || '',
                video: row?.video !== undefined ? row?.video.toString() : ''
            });
        }
    }, [row]);

    const checkStateMatch = (state: string) => {
        if (state === nameState) {
            toast.warning('The Client state matches with the client.');
        }
    };

    const handleSelectChange = (selected: any) => {
        setSelectedClinician(selected);
        if (selected?.state) {
            checkStateMatch(selected.state);
        }
    };

    const handlePeerSelectChange = (selected: any) => {
        setSelectedPeers(selected);
        selected.forEach((peer: any) => {
            if (peer?.state) {
                checkStateMatch(peer.state);    
            }
        });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const assignData = {
            therapistId: selectedClinician?.value,
            peerSupportIds: selectedPeers.map((peer: any) => peer.value),
            ...formData
        };
        startTransition(async () => {
            try {
                const response = await updateAssignments(`/admin/appointments/${row._id}`, assignData);

                if (response.status === 200 ) { 
                    toast.success("Assignment updated successfully");
                    onRequestClose();
                    mutate();
                } else {
                    toast.error("Failed to update assignment");
                }
            } catch (error) {
                console.error('Error updating assignments:', error);
                toast.error("An error occurred while updating the assignment");
            }
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Update Assignment"
            bodyOpenClassName='overflow-hidden'
            className="modal max-w-[1180px] bg-white p-5 mx-auto rounded-[20px] w-full max-h-[90vh] overflow-auto overflo-custom"
            overlayClassName="w-full h-full fixed inset-0 px-3 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
            <h2 className="text-xl mb-4">Update Assignment Information</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <CustomSelect
                            name="Assign Clinician"
                            value={selectedClinician}
                            options={therapistData}
                            onChange={handleSelectChange}
                            placeholder="Select"
                        />
                    </div>
                    <div>
                        <CustomSelect
                            name="Assign Peer Support"
                            value={selectedPeers}
                            options={therapistData}
                            onChange={handlePeerSelectChange} 
                            placeholder="Select"
                            isMulti={true}
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Message</label>
                        <select
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-[10px] border-[#CDE3F1]"
                            required
                        >
                            <option value="" disabled>Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Workshop</label>
                        <input
                            name="workshop"
                            value={formData.workshop}
                            onChange={handleInputChange}
                            placeholder="Enter workshop details"
                            className="w-full p-2 border rounded-[10px] border-[#CDE3F1]"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Video</label>
                        <select
                            name="video"
                            value={formData.video}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className='mt-[30px] flex justify-end'>
                    <button type="submit" className="button px-[30px]" disabled={isPending}>
                        {isPending ? 'Submitting...' : 'Submit'} <ButtonArrow />
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateAssignments;
