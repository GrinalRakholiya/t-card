import React from 'react';
import { Input, InputProps } from 'antd';
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface PasswordFieldProps extends InputProps {
  className?: string;
  label?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, className, ...otherProps }) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className="font-medium text-gray-60 text-[15px]">
      {label}
    </label>
    <Input.Password className={`!py-2 ${className}`} {...otherProps} />
  </div>
);
export default PasswordField;
