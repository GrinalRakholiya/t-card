import React from 'react';
import { Input as AntdInput, InputProps } from 'antd';

interface InputFieldProps extends InputProps {
  label?: string;
}

const Input: React.FC<InputFieldProps> = ({ className, label, ...otherProps }) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className="font-medium text-gray-60 text-[15px]">
      {label}
    </label>
    <AntdInput {...otherProps} className={`!py-2 ${className}`} />
  </div>
);

export default Input;
