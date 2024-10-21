import React from 'react';
interface clientsData {
    row: any
  }
const InsurenceTab = (props: clientsData) => {
const {row} = props;
    const questions = [
        { question: 'Insurance Company', answer: row?.clientId?.insuranceCompany?.insuranceCompanyName },
        { question: 'Member ID', answer: row?.clientId?.insuranceCompany?.memberOrSubscriberId },
        { question: 'Patient first name', answer: row?.clientId?.firstName },
        { question: 'Patient last name', answer: row?.clientId?.lastName },
        { question: 'Date Of Birth', answer: row?.clientId?.insuranceCompany?.dateOfBirth },
        { question: 'Location', answer: row?.clientId?.state },
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
