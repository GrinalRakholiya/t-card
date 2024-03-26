import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

const { TextArea } = Input;

interface TextareaProps extends TextAreaProps {
  label?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, className, ...otherProps }) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className="font-medium text-gray-60 text-[15px]">
      {label}
    </label>
    <TextArea showCount maxLength={100} className={`${className}`} {...otherProps} />
  </div>
);

export default Textarea;
