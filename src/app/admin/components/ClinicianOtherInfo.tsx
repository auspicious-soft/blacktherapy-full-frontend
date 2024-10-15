import React from 'react';

const ClinicianOtherInfo = () => {
    const questions = [
        { question: 'Would you like a company provided email account?', answer: 'No', type: 'text' },
        { question: 'Provider Type?', answer: 'Paraprofessional', type: 'text' },
        { question: 'Are you licensed and/or certified?', answer: 'Yes', type: 'text' },
        { question: 'Do you have computer equipment and Wifi to access our platform?', answer: 'No', type: 'text' },
        { question: 'Do you have experience working on a telehealth platform?', answer: 'Yes', type: 'text' },
        { question: 'Do you have any disciplinary actions (including pending) with any licensing or credentialing board?', answer: 'No', type: 'text' },
        { question: 'Do you have independent Malpractice Insurance?', answer: 'Paraprofessional', type: 'text' },
        { question: 'Document No', answer: 'Yes', type: 'text' },
        { question: 'Have you had a claim filed in the last 6 months.?', answer: 'No', type: 'text' },
        { question: 'Licensure/Certification Issued Dat', answer: 'Yes', type: 'text' },
        { question: 'Licensure/Certification Expiration', answer: 'No', type: 'text' },
        { question: 'NPI number', answer: 'Paraprofessional', type: 'text' },
        { question: 'Taxonomy code', answer: 'Yes', type: 'text' },
        { question: 'Do you require supervision?', answer: 'No', type: 'text' },
        { question: 'License Type', answer: 'Yes', type: 'text' },
        { question: 'Licensure/Certification State', answer: 'No', type: 'text' },
        { question: 'Which licensing board or agency issued your credentials?', answer: 'Paraprofessional', type: 'text' },
        { question: 'Do you have a supervisor with a valid supervision agreement in place?', answer: 'Yes', type: 'text' },
        { question: 'copy of your Licensure/Certification', answer: 'No', type: 'document' },
        { question: 'Which are your preferred means of online consultation?', answer: 'Yes', type: 'text' },
        { question: 'Preferred Language?', answer: 'English', type: 'text'},
        { question: 'Are you fluent in any other languages besides english?', answer: 'English', type: 'text'},
        { question: 'Year of Experience?', answer: 'English', type: 'text'},
        { question: 'Your Approach to Helping?', answer: 'English', type: 'text'},
        { question: 'Clientele', answer: 'English', type: 'text'},
        { question: 'General Expertise', answer: 'a', type: 'text'},
        { question: 'About', answer: 'a', type: 'text'}
    ];
    return (
        <div className='grid md:grid-cols-3 gap-4 md:gap-[30px]'>
            {questions.map((item, index) => (
                <div key={index}>
                    <label className="block mb-2">{item.question}</label>
                    {item.type === 'text' ? (
                        <p className='text-[#283C63] text-sm font-gothamMedium leading-[normal]'>{item.answer}</p>
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
}

export default ClinicianOtherInfo;