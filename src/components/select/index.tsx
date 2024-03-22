import React from 'react';
import { Select as AntdSelect, SelectProps } from 'antd';

interface SelectFieldProps extends SelectProps {
  label?: string;
}

const Select: React.FC<SelectFieldProps> = ({ label, className, defaultValue, options, ...otherProps }) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className="font-medium text-gray-60 text-[15px]">
      {label}
    </label>
    <AntdSelect
      className={`${className}`}
      defaultValue={defaultValue}
      style={{ width: 120 }}
      options={options}
      {...otherProps}
    />
  </div>
);

export default Select;
