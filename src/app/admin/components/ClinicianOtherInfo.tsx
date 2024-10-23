import React from 'react';

interface ClinicianOtherInfoProps {
    row: any;
}

const ClinicianOtherInfo: React.FC<ClinicianOtherInfoProps> = ({ row }) => {
    const questions = [
        { question: 'Would you like a company-provided email account?', answer: row?.otherDetailsOfTherapist?.companyProvidedEmail, type: 'boolean' },
        { question: 'Provider Type?', answer: row?.otherDetailsOfTherapist?.providerType, type: 'text' },
        { question: 'Are you licensed and/or certified?', answer: row?.otherDetailsOfTherapist?.licensedAndCertified, type: 'boolean' },
        { question: 'Do you have computer equipment and Wifi to access our platform?', answer: row?.otherDetailsOfTherapist?.computerAndWifi, type: 'boolean' },
        { question: 'Do you have experience working on a telehealth platform?', answer: row?.otherDetailsOfTherapist?.expInTeleHealthPlatform, type: 'boolean' },
        { question: 'Do you have any disciplinary actions (including pending) with any licensing or credentialing board?', answer: row?.otherDetailsOfTherapist?.anyDisciplinaryActionTaken, type: 'boolean' },
        { question: 'Do you have independent Malpractice Insurance?', answer: row?.otherDetailsOfTherapist?.independentMalpracticeInsurance, type: 'boolean' },
        { question: 'Have you had a claim filed in the last 6 months?', answer: row?.otherDetailsOfTherapist?.claimedFilledInLast6Months, type: 'boolean' },
        { question: 'Licensure/Certification Issued Date', answer: row?.otherDetailsOfTherapist?.licenseOrCertificationIssuedDate.split('T')[0], type: 'text' },
        { question: 'Licensure/Certification Expiration', answer: row?.otherDetailsOfTherapist?.licenseOrCertificationExpiryDate.split('T')[0], type: 'text' },
        { question: 'NPI number', answer: row?.otherDetailsOfTherapist?.PNPINumber, type: 'text' },
        { question: 'Taxonomy code', answer: row?.otherDetailsOfTherapist?.taxonomyCode, type: 'text' },
        { question: 'Do you require supervision?', answer: row?.otherDetailsOfTherapist?.requireSupervision, type: 'boolean' },
        { question: 'License Type', answer: row?.otherDetailsOfTherapist?.licenceType, type: 'text' },
        { question: 'Licensure/Certification State', answer: row?.otherDetailsOfTherapist?.licenceOrCertificationState, type: 'text' },
        { question: 'Which licensing board or agency issued your credentials?', answer: row?.otherDetailsOfTherapist?.licensingBoardOrAgency, type: 'text' },
        { question: 'Do you have a supervisor with a valid supervision agreement in place?', answer: row?.otherDetailsOfTherapist?.validSupervisionAgreement, type: 'boolean' },
        { question: 'Copy of your Licensure/Certification', answer: row?.otherDetailsOfTherapist?.licenseOrCertificationFile, type: 'document' },
        { question: 'Which are your preferred means of online consultation?', answer: row?.otherDetailsOfTherapist?.preferredCommunicationMethod, type: 'text' },
        { question: 'Preferred Language?', answer: row?.otherDetailsOfTherapist?.preferredLanguage, type: 'text' },
        { question: 'Are you fluent in any other languages besides English?', answer: row?.otherDetailsOfTherapist?.fluencyOtherThanEnglish, type: 'boolean' },
        { question: 'Year of Experience?', answer: row?.otherDetailsOfTherapist?.yearsOfExperience, type: 'text' },
        { question: 'Your Approach to Helping?', answer: row?.otherDetailsOfTherapist?.helpingApproach, type: 'text' },
        { question: 'Clientele', answer: row?.otherDetailsOfTherapist?.clientele, type: 'text' },
        { question: 'General Expertise', answer: row?.otherDetailsOfTherapist?.generalExpertise, type: 'text' },
        { question: 'About', answer: row?.otherDetailsOfTherapist?.aboutYou, type: 'text' }
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
                        <a
                            href={item.answer}
                            download
                            className="text-xs bg-[#283C63] text-white py-[8px] px-3 rounded-[4px] leading-[normal] inline-block"
                        >
                            Download
                        </a>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default ClinicianOtherInfo;
