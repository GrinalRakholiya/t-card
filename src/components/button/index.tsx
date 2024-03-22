import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';

const Button: React.FC<ButtonProps> = ({ children, onClick, type, className, ...props }) => (
  <AntdButton onClick={onClick} {...props} type={type} className={`px-5 !h-auto ${className}`}>
    {children}
  </AntdButton>
);

export default Button;
