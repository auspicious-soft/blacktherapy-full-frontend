import React from 'react';

const InsurenceTab = () => {
    const questions = [
        { question: 'Insurance Company', answer: 'No' },
        { question: 'Member ID', answer: '' },
        { question: 'Patient first name', answer: '' },
        { question: 'Patient last name', answer: 'No' },
        { question: 'Date Of Birth', answer: 'Yes' },
        { question: 'Location', answer: 'No' },
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
