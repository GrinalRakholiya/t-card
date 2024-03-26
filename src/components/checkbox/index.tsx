import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox/Checkbox';

interface CheckBoxProps extends CheckboxProps {
  className?: string;
}

const Checkbox: React.FC<CheckBoxProps> = ({ className, children, ...otherProps }) => (
  <AntdCheckbox className={` ${className}`} {...otherProps}>
    <span className="font-medium text-gray-60">{children}</span>
  </AntdCheckbox>
);

export default Checkbox;
