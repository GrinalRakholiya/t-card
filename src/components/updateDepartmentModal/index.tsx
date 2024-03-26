import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Modal from '../modal/index.tsx';
import Button from '../button/index.tsx';
import Input from '../inputField/index.tsx';
import { SetUpdatedataInterface, UpdateDepartmentModalInterface } from './types.ts';
import { addDepartmentAction, updateDepartmentAction } from '../../redux/actions/departmentAction.ts';
import { setError } from '../../redux/slices/departmentSlice.ts';
import useNotification from '../../hooks/useNotification.ts';

const UpdateDepartmentModal: React.FC<UpdateDepartmentModalInterface> = ({
  updateData,
  isModalOpen,
  setIsModalOpen,
  page,
  limit,
}) => {
  const [nameValue, setNameValue] = useState<SetUpdatedataInterface>({
    department: '',
    sequence: 0,
  });
  const { openNotificationWithIcon, contextHolder } = useNotification();

  const handleCloseNotification = (): void => {
    setError(null);
  };

  const [form] = Form.useForm();

  const handleClose = (): void => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (): Promise<void> => {
    try {
      await form.validateFields();
      setIsModalOpen(false);
      const formData = form.getFieldsValue();
      if (updateData) {
        const updateDepartmentData = {
          department: formData.department,
          sequence: parseInt(formData.sequence, 10),
        };
        updateDepartmentAction(updateData.department_id, updateDepartmentData, page, limit);
      } else {
        addDepartmentAction(nameValue, page, limit);
      }
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Something went wrong! please try again later.',
        description: '',
        onClose: handleCloseNotification,
      });
    }
    form.resetFields();
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldsValue({
        department: updateData.department,
        sequence: updateData.sequence,
      });
    } else {
      form.resetFields();
    }
  }, [updateData, form]);

  return (
    <div>
      {contextHolder}
      <Modal
        title={`${updateData ? 'Update' : 'Add'} department`}
        footer=""
        centered
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <div className="my-7 mb-7">
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto">
              <Form.Item
                key="department"
                name="department"
                rules={[{ required: true, message: `Please input your department!` }]}
              >
                <Input
                  value={nameValue.department}
                  onChange={(e) => setNameValue({ ...nameValue, department: e.target.value })}
                  label="Department"
                  placeholder="Enter department name"
                />
              </Form.Item>
              <Form.Item
                key="sequence"
                name="sequence"
                rules={[{ required: true, message: `Please input your sequence` }]}
              >
                <Input
                  type="number"
                  value={nameValue.sequence}
                  onChange={(e) => setNameValue({ ...nameValue, sequence: +e.target.value })}
                  label="Sequence"
                  placeholder="Enter sequence number"
                />
              </Form.Item>
            </div>
            <div className="flex justify-end items-center -mb-5 mt-3 gap-2">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="!font-semibold">
                {updateData ? 'Update department' : 'Add department'}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateDepartmentModal;
