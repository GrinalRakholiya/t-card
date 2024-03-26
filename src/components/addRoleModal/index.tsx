import React, { useState } from 'react';
import { Form } from 'antd';
import { FieldInterface } from '../../pages/roles/types.ts';
import Modal from '../modal/index.tsx';
import Input from '../inputField/index.tsx';
import Button from '../button/index.tsx';
import { addRolesAction } from '../../redux/actions/rolesAction.ts';

interface AddRoleModalProps {
  isModalOpen: boolean;
  page: number;
  limit: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ isModalOpen, setIsModalOpen, page, limit }) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [form] = Form.useForm();

  const onFinish = (): void => {
    setIsModalOpen(false);
    addRolesAction(
      {
        role: nameValue,
      },
      page,
      limit
    );
    setNameValue('');
    form.resetFields();
  };

  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  return (
    <Modal centered open={isModalOpen} title="Add role" footer="" onOk={handleClose} onCancel={handleClose}>
      <div className="my-7 mb-7">
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item<FieldInterface>
            label=""
            name="username"
            rules={[{ required: true, message: 'Please enter role name!' }]}
          >
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              label="Role name"
              placeholder="Enter role name"
            />
          </Form.Item>
          <div className="flex justify-end items-center -mb-5 gap-2">
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

export default AddRoleModal;
