import React from 'react';
interface clientsData {
    clientData: any
  }
const InsurenceTab = (props: clientsData) => {
const {clientData} = props;
    const questions = [
        { question: 'Insurance Company', answer: clientData?.insuranceCompany?.insuranceCompanyName },
        { question: 'Member ID', answer: clientData?.insuranceCompany?.memberOrSubscriberId },
        { question: 'Patient first name', answer: clientData?.firstName },
        { question: 'Patient last name', answer: clientData?.lastName },
        { question: 'Date Of Birth', answer: clientData?.insuranceCompany?.dateOfBirth },
        { question: 'Location', answer: clientData?.state },
    ];

    return (
        <div className='grid md:grid-cols-3 gap-4 md:gap-[30px]'>
            {questions.map((item, index) => (
                <div key={index}>
                    <label className="block mb-2">{item.question}</label>
                    <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal]'>{item.answer}</p>
                </div>
            ))}
           
        </div>
    );
}
export default InsurenceTab;
