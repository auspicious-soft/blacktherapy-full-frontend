import { ChangeEvent, FC } from 'react';

interface InputFieldProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean;
  disabled?: boolean;
}

const InputField: FC<InputFieldProps> = ({ type, value, placeholder, onChange , required, disabled = false }) => {
  return (
    <div className='mb-[15px]'>
      <input
      className='h-[42px] md:h-[58px] w-full px-4 md:px-7 text-sm md:text-base rounded-[20px] border border-[#dbe0eb] text-black'
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
    </div>

  );
};

export default InputField;
