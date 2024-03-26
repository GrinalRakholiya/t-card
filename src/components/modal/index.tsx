import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';

const Modal: React.FC<ModalProps> = ({ children, ...props }) => <AntdModal {...props}>{children}</AntdModal>;

export default Modal;
