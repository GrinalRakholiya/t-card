import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { DataInterface, SetUpdateVehicleInterface } from './type.ts';
import Button from '../button/index.tsx';
import Modal from '../modal/index.tsx';
import Input from '../inputField/index.tsx';
import useNotification from '../../hooks/useNotification.ts';
import { setError } from '../../redux/slices/vehiclesSlice.ts';
import Select from '../select/index.tsx';
import { updateVehicleAction } from '../../redux/actions/vehiclesAction.ts';

const UpdateVehicleModal: React.FC<DataInterface> = ({ viewData, isUpdateOpen, setIsUpdateOpen, page, limit }) => {
  const [nameValue, setNameValue] = useState<SetUpdateVehicleInterface>({
    key_tag: 0,
    parked_at: '',
  });

  const { openNotificationWithIcon, contextHolder } = useNotification();
  const [form] = Form.useForm();

  const handleClose = (): void => {
    setIsUpdateOpen(false);
  };

  const handleCloseNotification = (): void => {
    setError(null);
  };

  const onFinish = async (): Promise<void> => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      if (viewData) {
        const updateVehicleData = {
          key_tag: parseInt(formData.key_tag, 10),
          parked_at: formData.parked_at,
        };
        updateVehicleAction(viewData.qr_code, updateVehicleData, page, limit);
      }
      setIsUpdateOpen(false);
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Something went wrong! please try again later.',
        description: '',
        onClose: handleCloseNotification,
      });
    }
  };

  useEffect(() => {
    if (viewData) {
      form.setFieldsValue({
        key_tag: viewData?.key_tag,
        parked_at: viewData?.parked_at,
      });
    } else {
      form.resetFields();
    }
  }, [viewData, form]);
  return (
    <div>
      {contextHolder}
      <div>
        <Modal title="Update vehicle" footer="" centered open={isUpdateOpen} onOk={handleClose} onCancel={handleClose}>
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
                  key="key_tag"
                  name="key_tag"
                  rules={[{ required: true, message: `Please input your key tag!` }]}
                >
                  <Input
                    type="number"
                    value={nameValue.key_tag}
                    onChange={(e) => setNameValue({ ...nameValue, key_tag: +e.target.value })}
                    label="Key tag"
                    placeholder="Enter key tag"
                  />
                </Form.Item>
                <Form.Item
                  key="parked_at"
                  name="parked_at"
                  rules={[{ required: true, message: `Please select parked at` }]}
                >
                  <Select
                    label="Parked at"
                    defaultValue={nameValue.parked_at}
                    value={nameValue.parked_at}
                    onChange={(value) => setNameValue({ ...nameValue, parked_at: value })}
                    className="!w-full !py-0 !h-[40px]"
                    placeholder="Please select parked at"
                    options={[
                      { value: 'COMPOUND', label: 'Compound' },
                      { value: 'ON-SITE', label: 'On-site' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-end items-center -mb-5 mt-3 gap-2">
                <Button onClick={() => setIsUpdateOpen(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="!font-semibold">
                  Update vehicle
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateVehicleModal;
