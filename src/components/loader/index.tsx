import React from 'react';
import { Spin, SpinProps } from 'antd';

import './loaderStyle.scss';

const Loader: React.FC<SpinProps> = (props) => <Spin size="large" fullscreen {...props} className="z-[10000]" />;

export default Loader;
