import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import Input from '../inputField/index.tsx';
import Button from '../button/index.tsx';
import { ResetValueInterface } from './types.ts';
import { reserUserAction } from '../../redux/actions/usersAction.ts';

interface resetPassModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUserName?: string;
}

const ResetPasswordModal: React.FC<resetPassModalProps> = ({ isUserName, isModalOpen, setIsModalOpen }) => {
  const [nameValue, setNameValue] = useState<ResetValueInterface>({
    user_name: '',
    new_password: '',
  });

  const [form] = Form.useForm();

  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  const onFinish = (): void => {
    setIsModalOpen(false);
    reserUserAction(nameValue);
    form.resetFields();
  };

  return (
    <Modal title="Reset password" footer="" centered open={isModalOpen} onOk={handleClose} onCancel={handleClose}>
      <div className="my-7 mb-7">
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <div className="max-h-[calc(100vh-160px)] overflow-y-auto">
            <Form.Item
              key="password"
              name="password"
              rules={[{ required: true, message: `Please enter new password!` }]}
            >
              <Input
                value={nameValue.new_password}
                onChange={(e) => setNameValue({ ...nameValue, user_name: isUserName, new_password: e.target.value })}
                label="Password"
                placeholder="Enter new password"
              />
            </Form.Item>
          </div>
          <div className="flex justify-end items-center -mb-5 mt-3 gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="!font-semibold">
              Add
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
