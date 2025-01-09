import { getImageUrlOfS3 } from '@/utils';
import Link from 'next/link';
import React from 'react';

interface ClinicianOtherInfoProps {
    row: any;
}

const ClinicianOtherInfo: React.FC<ClinicianOtherInfoProps> = ({ row }) => {
    console.log('row:', row);
    const questions = [
        { question: 'Are you licensed and/or certified? ', answer: row?.otherDetailsOfTherapist?.licenceType, type: 'text' },
        // { question: 'Provider Type?', answer: row?.otherDetailsOfTherapist?.providerType, type: 'text' },
        { question: 'Licence type?', answer: row?.otherDetailsOfTherapist?.licenseOrCertification, type: 'text' },
        // { question: 'Do you have computer equipment and Wifi to access our platform?', answer: row?.otherDetailsOfTherapist?.computerAndWifi, type: 'boolean' },
        // { question: 'Do you have experience working on a telehealth platform?', answer: row?.otherDetailsOfTherapist?.expInTeleHealthPlatform, type: 'boolean' },
        { question: 'Can you submit verification of your legal right to work in the United States?', answer: row?.otherDetailsOfTherapist?.legalRightToWorkInUS, type: 'boolean' },
        { question: 'Current employeement status?', answer: row?.otherDetailsOfTherapist?.currentEmploymentStatus, type: 'text' },
        // { question: 'Have you had a claim filed in the last 6 months?', answer: row?.otherDetailsOfTherapist?.claimedFilledInLast6Months, type: 'boolean' },
        { question: 'Current or previous employer name?', answer: row?.otherDetailsOfTherapist?.currentOrPreviousEmployerName, type: 'text' },
        { question: 'Employment Desired?', answer: row?.otherDetailsOfTherapist?.employmentDesired, type: 'text' },
        // { question: 'NPI number', answer: row?.otherDetailsOfTherapist?.PNPINumber, type: 'text' },
        // { question: 'Taxonomy code', answer: row?.otherDetailsOfTherapist?.taxonomyCode, type: 'text' },
        { question: 'Rate of pay?', answer: row?.otherDetailsOfTherapist?.rateOfPay, type: 'text' },
        { question: 'Are you able to perform the essential functions of the position for which you are applying either with or without reasonable accommodations?', answer: row?.otherDetailsOfTherapist?.reasonableAccommodation, type: 'boolean' },
        { question: 'Do you have Reliable Transportation?', answer: row?.otherDetailsOfTherapist?.reliableTransportation, type: 'boolean' },
        { question: 'Do you have a supervisor with a valid supervision agreement in place?', answer: row?.otherDetailsOfTherapist?.validSupervisionAgreement, type: 'boolean' },
        { question: 'Copy of your Resume?', answer: row?.otherDetailsOfTherapist?.currentResume, type: 'document' },
        { question: 'Which are your preferred means of online consultation?', answer: row?.otherDetailsOfTherapist?.preferredCommunicationMethod, type: 'text' },
        { question: 'Do you have Driver License?', answer: row?.otherDetailsOfTherapist?.validDriverLicense, type: 'boolean' },
        { question: 'Driver’s license or State ID Number', answer: row?.otherDetailsOfTherapist?.driverLicenseOrStateId, type: 'text' },
        // { question: 'Your Approach to Helping?', answer: row?.otherDetailsOfTherapist?.helpingApproach, type: 'text' },
        // { question: 'Clientele', answer: row?.otherDetailsOfTherapist?.clientele, type: 'text' },
        { question: 'General Expertise', answer: row?.otherDetailsOfTherapist?.skills, type: 'text' },
        { question: 'About', answer: row?.otherDetailsOfTherapist?.about, type: 'text' },
        { question: 'Additional information', answer: row?.otherDetailsOfTherapist?.additionalInformation, type: 'text' },
    ];

    return (
        <div className='grid md:grid-cols-3 gap-4 md:gap-[30px]'>
            {questions.map((item, index) => (
                <div key={index}>
                    <label className="block mb-2">{item.question}</label>
                    {item.type === 'text' ? (
                        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal]'>{item.answer}</p>
                    ) : item.type === 'boolean' ? (
                        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal]'>{item.answer ? 'Yes' : 'No'}</p>
                    ) : item.type === 'document' ? (
                        <Link 
                        href={getImageUrlOfS3(item.answer) ?? ""}
                        target="_blank"
                        className="text-xs bg-[#283C63] text-white py-[8px] px-3 rounded-[4px] leading-[normal] inline-block"
                      >Download
                      </Link>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default ClinicianOtherInfo;
