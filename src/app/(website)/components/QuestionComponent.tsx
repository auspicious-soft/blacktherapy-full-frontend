import React, { useState } from 'react';
import clsx from 'clsx';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  allowedFileTypes?: string[];
  customValidation?: (value: any, formData: any) => boolean;
  errorMessage?: string;
}

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
  validation?: ValidationRules;
  required?: boolean;
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
  setFormData,
  validation = {},
  required = false,
}) => {
  const [error, setError] = useState<string>('');

  const validateField = (value: any): string => {
    if (!validation) return '';

    if (validation.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return validation.errorMessage || 'This field is required';
    }

    if (validation.minLength && typeof value === 'string' && value.trim().length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`;
    }

    if (validation.maxLength && typeof value === 'string' && value.trim().length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`;
    }

    if (type === 'number') {
      const numValue = Number(value);
      if (validation.minValue !== undefined && numValue < validation.minValue) {
        return `Value must be at least ${validation.minValue}`;
      }
      if (validation.maxValue !== undefined && numValue > validation.maxValue) {
        return `Value must be no more than ${validation.maxValue}`;
      }
    }

    if (type === 'file' && validation.allowedFileTypes && value) {
      const file = value as File;
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!validation.allowedFileTypes.includes(fileExtension)) {
        return `Allowed file types: ${validation.allowedFileTypes.join(', ')}`;
      }
    }

    if (validation.customValidation && !validation.customValidation(value, formData)) {
      return validation.errorMessage || 'Invalid value';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    let newValue: any;

    switch (inputType) {
      case 'checkbox':
        if (options) {
          const currentValues = (formData[name] as string[]) || [];
          newValue = (e.target as HTMLInputElement).checked
            ? [...currentValues, value]
            : currentValues.filter(v => v !== value);
        } else {
          newValue = (e.target as HTMLInputElement).checked;
        }
        break;
      case 'file':
        newValue = (e.target as HTMLInputElement).files?.[0] || null;
        break;
      default:
        newValue = value;
    }

    const validationError = validateField(newValue);
    setError(validationError);

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const questionNumber = typeof index === 'string' && index.includes('_')
    ? parseInt(index.split('_')[1]) + 1
    : Number(index) + 1;

  const isActive = typeof formData[name] === 'boolean'
    ? formData[name]
    : Boolean(formData[name] && String(formData[name]).trim());

  return (
    <div className='questions'>
      <div className="mb-4 md:mb-8 grid md:grid-cols-2 gap-3 md:gap-5 items-center">
        <div className="flex items-center gap-5 lg:gap-[50px]">
          <div
            className={clsx(
              "after-line relative w-[45px] h-[45px] md:w-[65px] md:h-[65px] grid place-items-center rounded-full border-2",
              isActive ? "bg-[#283C63] text-white border-[#CCE9FA]" : "bg-[#FBFBFD] text-base text-[#3A3A3C] border-[#CCE9FA]",
              error && "border-red-500"
            )}
          >
            <p className='text-sm md:text-base'>
              <span className='text-lg md:text-[33px]'>{questionNumber}</span>/{total}
            </p>
          </div>
          <label className="w-[calc(100%-65px)] md:w-[calc(100%-115px)] text-[#283c63] text-sm">
            {question}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>

        <div className="relative">
          {type === 'radio' && options ? (
            <div className="flex items-center gap-5 md:gap-[50px] ml-4 md:ml-0">
              {options.map(option => (
                <label key={option} className="custom-radio pl-6 flex items-center relative">
                  <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={formData[name] === option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className='text-[#ADADAD] text-sm'>{option}</span>
                </label>
              ))}
            </div>
          ) : type === 'select' && options ? (
            <select
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
              className={clsx(
                "w-full text-[#686C78] px-[18px] h-[45px] text-sm py-2 border rounded-[20px] focus:outline-none focus:ring-1",
                error ? "border-red-500" : "border-[#dbe0eb] focus:border-[#283C63]"
              )}
            >
              <option value="">{placeholder}</option>
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
                    checked={Array.isArray(formData[name]) && formData[name].includes(option)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className='text-sm'>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <input
              type={type}
              name={name}
              value={type !== 'file' ? (formData[name] || '') : undefined}
              onChange={handleChange}
              placeholder={placeholder}
              className={clsx( 
                "text-[#686C78] w-full px-[18px] h-[45px] text-sm py-2 border rounded-[20px] focus:outline-none focus:ring-1",
                error ? "border-red-500" : "border-[#dbe0eb] focus:border-[#283C63]"
              )}
              required={required}
            />
          )}
          {error && (
            <p className="absolute -bottom-6 left-0 text-red-500 text-xs">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;