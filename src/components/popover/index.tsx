import React from 'react';
import { Popover as AntdPopover, PopoverProps } from 'antd';
import './popoverStyle.scss';

const Popover: React.FC<PopoverProps> = ({ className, ...props }) => (
  <AntdPopover className={`popover-main ${className}`} {...props} />
);

export default Popover;
