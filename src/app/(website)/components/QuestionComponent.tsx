import React from 'react';
import clsx from 'clsx';

interface QuestionComponentProps {
  question: string;
  index: string | number;  
  name: string; 
  total: number;
  type: string;  
  placeholder?: string;
  options?: string[]; 
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  name,
  index,
  total,
  placeholder,
  options,
  type,
  formData,
  setFormData
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  };
  
  const indexString = index.toString();


  const questionNumber = indexString.includes('_') 
    ? parseInt(indexString.split('_')[1]) + 1 
    : parseInt(indexString) + 1;

    const isActive = typeof formData[name] === 'boolean' 
    ? formData[name] 
    : Boolean(formData[name]?.trim());
  
  return (
    <div className='questions'>
      <div className="mb-4 md:mb-8 grid md:grid-cols-2 gap-3 md:gap-5 items-center">
        <div className="flex items-center gap-5 lg:gap-[50px]">
          <div
            className={clsx(
              "after-line relative w-[45px] h-[45px] md:w-[65px] md:h-[65px] grid place-items-center rounded-full border-2 border-[#CCE9FA]",
              isActive ? "bg-[#283C63] text-white border-[#CCE9FA]" : "bg-[#FBFBFD] text-base text-[#3A3A3C]"
            )}
          >
            <p className='text-sm md:text-base'><span className='text-lg md:text-[33px]'>{questionNumber}</span>/{total}</p>
          </div>
          <label className="w-[calc(100%-65px)] md:w-[calc(100%-115px)] text-[#283c63] text-sm">{question}</label>
        </div>

        {type === 'radio' && options ? (
          <div className="flex items-center gap-5 md:gap-[50px] ml-4 md:ml-0">
            {options.map(option => (
              <label key={option} className="custom-radio pl-6 flex items-center relative ">
                <input
                  type="radio"
                  name={name}
                  // name={indexString}
                  value={option}
                  checked={formData[name] === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className='text-[#ADADAD] text-sm'> {option}</span>
              </label>
            ))}
          </div>
        ) : type === 'select' && options ? (
          <select
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className="w-full text-[#686C78] px-[18px] h-[45px] text-sm py-2 border border-[#dbe0eb] rounded-[20px] focus:outline-none focus:ring-1 focus:border-[#283C63]"
          >
            <option value="" >{placeholder}</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'checkbox' && options ? (
          <div className="flex flex-wrap gap-[10px]">
            {options.map(option => (
              <label key={option} className="custom-checkbox relative flex items-center">
                <input
                  type="checkbox"
                  
                  name={name}
                  value={option}
                  checked={Array.isArray(formData[indexString]) && formData[indexString].includes(option)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className='text-sm'>{option}</span>
              </label>
            ))}
          </div>
        ) : type === 'file' ? (
          <input
            type="file"
            name={name}
            //value={formData[name] || ''}
            onChange={handleChange}
            className="text-[#686C78] w-full px-[18px] h-[45px] text-sm py-2 border border-[#dbe0eb] rounded-[20px] focus:outline-none focus:ring-1 focus:border-[#283C63]"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className="text-[#686C78] w-full px-[18px] h-[45px] text-sm py-2 border border-[#dbe0eb] rounded-[20px] focus:outline-none focus:ring-1 focus:border-[#283C63]"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;
