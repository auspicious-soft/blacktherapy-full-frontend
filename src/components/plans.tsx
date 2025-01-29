import ViewPlans from '@/app/customer/components/ViewPlans'
import React, { useRef, useState } from 'react'
import Modal from 'react-modal'

interface Props {
    modalRef: React.MutableRefObject<any>
    openPlansModal: boolean
    setOpenPlansModal: React.Dispatch<React.SetStateAction<boolean>>
    toHide?: boolean
}

const PlansModal = (props: Props) => {
    const { modalRef, openPlansModal, setOpenPlansModal, toHide = false } = props
    return (
        <div>
            {openPlansModal && (
                <Modal
                    isOpen={openPlansModal}
                    className="modal bg-[#E7F8F6] max-w-[1200px] p-10 max-h-[95vh] h-full mx-auto rounded-[20px] w-full overflow-y-auto overflo-custom "
                    overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
                    onRequestClose={() => {
                        if (!toHide) {
                            setOpenPlansModal(false)
                            return
                        }
                        return
                    }} >
                    <ViewPlans modalRef={modalRef} />
                </Modal>
            )}

        </div>
    )
}

export default PlansModal