import { ChangeEvent, FC } from 'react';

interface InputFieldProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({ type, value, placeholder, onChange  }) => {
  return (
    <div className='mb-[15px]'>
      <input
      className='h-[42px] md:h-[58px] w-full px-4 md:px-7 text-sm md:text-base rounded-[20px] border border-[#dbe0eb]'
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    </div>

  );
};

export default InputField;
