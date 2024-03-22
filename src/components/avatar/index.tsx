import React from 'react';
import { Avatar as AntdAvatar, AvatarProps } from 'antd';

interface AvatarDesignProps extends AvatarProps {
  className?: string;
}

const Avatar: React.FC<AvatarDesignProps> = ({ className, children, ...otherProps }) => (
  <AntdAvatar className={`!flex items-center justify-center ${className}`} {...otherProps}>
    {children}
  </AntdAvatar>
);

export default Avatar;
