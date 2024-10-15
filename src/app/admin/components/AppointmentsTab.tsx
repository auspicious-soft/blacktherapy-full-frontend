import React from 'react';

const AppointmentsTab = () => {
    const questions = [
        { question: `To begin, tell us why you're looking for help today?`, answer: 'No' },
        { question: `To begin, tell us why you're looking for help today?`, answer: 'yes' },
        { question: 'How would you rate your current physical health?', answer: 'Yes' },
        { question: 'How did you here about us?', answer: 'No' },
        { question: 'What gender do you identify with?', answer: 'Yes' },
        { question: 'Briefly describe the main issues or concerns that bring you to therapy?', answer: 'No' },
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

export default AppointmentsTab;
