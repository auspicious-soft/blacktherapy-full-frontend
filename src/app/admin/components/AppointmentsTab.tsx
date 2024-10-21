import React from 'react';
interface clientsData {
    row: any
  }
const AppointmentsTab:React.FC<clientsData> = ({row}) => {

 
    const questions = [
        { question: `To begin, tell us why you're looking for help today?`, answer: row?.clientId?.reasonForLookingHelp },
        { question: `To begin, tell us why you're looking for help today?`, answer: row?.clientId?.reasonForLookingHelp },
        { question: 'How would you rate your current physical health?', answer: row?.clientId?.rateCurrentPhysicalHealth },
        { question: 'How did you here about us?', answer: row?.clientId?.howYouKnewUs },
        { question: 'What gender do you identify with?', answer: row?.clientId?.gender },
        { question: 'Briefly describe the main issues or concerns that bring you to therapy?', answer: row?.clientId?.mainIssueBrief },
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
