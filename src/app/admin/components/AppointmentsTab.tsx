import React from 'react';
interface clientsData {
    clientData: any
  }
const AppointmentsTab = (props: clientsData) => {
const {clientData} = props;

    const questions = [
        { question: `To begin, tell us why you're looking for help today?`, answer: clientData?.reasonForLookingHelp },
        { question: `To begin, tell us why you're looking for help today?`, answer: clientData?.reasonForLookingHelp },
        { question: 'How would you rate your current physical health?', answer: clientData?.rateCurrentPhysicalHealth },
        { question: 'How did you here about us?', answer: clientData?.howYouKnewUs },
        { question: 'What gender do you identify with?', answer: clientData?.gender },
        { question: 'Briefly describe the main issues or concerns that bring you to therapy?', answer: clientData?.mainIssueBrief },
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
