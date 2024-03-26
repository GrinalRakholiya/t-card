import React from 'react';
import { Radio as AntdRadio, RadioProps } from 'antd';

interface RadioProp extends RadioProps {
  className?: string;
}

const Radio: React.FC<RadioProp> = ({ className, children, ...otherProps }) => (
  <AntdRadio className={className} {...otherProps}>
    {children}
  </AntdRadio>
);

export default Radio;
