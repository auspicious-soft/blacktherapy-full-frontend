import React from "react";
import Select, { StylesConfig, OptionsOrGroups, GroupBase, ActionMeta, MultiValue, SingleValue } from "react-select";

interface CustomSelectProps<OptionType> {
  value: SingleValue<OptionType> | MultiValue<OptionType>;
  onChange: (
    selectedOption: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  isMulti?: true;
  placeholder?: string;
  isSearchable?: boolean;
  name?: string;
  required?: boolean;
}
interface OptionType {
  value: string;
  label: string;
  state: string;
}
const customStyles: StylesConfig<any, true> = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    height: "auto",
    borderColor: "#CDE3F1", // Set the border color
    boxShadow: "none", // Remove default box shadow
    ":hover": {
      borderColor: "#CDE3F1",
    },
    padding: "3px 10px", // Adjust horizontal padding
    borderRadius: "10px",
    alignItems: "center", // Vertically center content
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#6B6B6B", // Placeholder color
    fontSize: "14px",
  }),
  input: (styles: any) => ({
    ...styles,
    margin: "0",
    padding: "0",
    height: "42px",
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
  }),
  option: (styles: any, { isDisabled, isFocused, isSelected }: any) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? "#283C63"
        : isFocused
          ? "#283C63"
          : undefined,
    color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
    cursor: isDisabled ? "not-allowed" : "pointer",
    padding: 4,
    ":active": {
      ...styles[":active"],
      backgroundColor: !isDisabled
        ? isSelected
          ? "#283C63"
          : "#283C63"
        : undefined,
    },
    ":hover": {
      color: "white",
    },
    borderRadius: "8px",
  }),
  multiValue: (styles: any) => ({
    ...styles,
    backgroundColor: "#283C63",
    color: "white",
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: "white",
    padding: 6,
    borderRadius: "2rem",
  }),
  menuList: (styles: any) => ({
    ...styles,
    padding: '8px',
    borderRadius: '16px',
    backgroundColor: 'white',
    cursor: 'pointer',
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 100
  }),
};

const CustomSelect: React.FC<CustomSelectProps<OptionType>> = ({
  value,
  onChange,
  options,
  isMulti,
  placeholder = "Select...",
  isSearchable = true,
  name,
  required = true,
}) => {
  const handleChange = (selectedOption: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    const event = {
      target: {
        name,
        value: selectedOption,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(selectedOption, actionMeta);
  };

  return (
    <div className="state-select h-auto">
      {name && <label htmlFor={name} className="block mb-2">
        {name}
      </label>}
      <Select
        id={name}
        value={value}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={true}
        required={required}
      />
    </div>
  );
};

export default CustomSelect;
