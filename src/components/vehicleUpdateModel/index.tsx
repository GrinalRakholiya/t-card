import React, { useEffect, useState } from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { Form, Row, Col, Input as AntdInput, Modal } from 'antd';
import Input from '../inputField/index.tsx';
import Button from '../button/index.tsx';
import { updateVehicleAction } from '../../redux/actions/vehiclesAction.ts';
import { VehicleUpdateModelProps, SetVehicleUpdateInterface } from './types.ts';
import ImageUpload from '../imageUpload/index.tsx';

const VehicleUpdateModel: React.FC<VehicleUpdateModelProps> = ({ isModalOpen, setIsModalOpen, vehicleData }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [nameValue, setNameValue] = useState<SetVehicleUpdateInterface>({
    keys: 0,
    owner: 0,
    price: 0,
    stock_number: 0,
    miles: 0,
    mechanical_info: '',
    additional_spec_and_info: '',
    image: [],
  });

  const { TextArea } = AntdInput;

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const onFinish = async (): Promise<void> => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      if (vehicleData) {
        const vehicleUpdateData = {
          keys: formData.keys,
          owner: formData.owner,
          price: formData.price,
          stock_number: formData.stock_number,
          miles: formData.miles,
          mechanical_info: formData.mechanical_info,
          additional_spec_and_info: formData.additional_spec_and_info,
          image: fileList.map((file) => file.originFileObj!),
        };
        updateVehicleAction(vehicleData.cardDetails.qr_code, vehicleUpdateData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log('error');
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (vehicleData) {
      form.setFieldsValue({
        keys: vehicleData.cardDetails?.keys,
        owner: vehicleData.cardDetails?.owner,
        price: vehicleData.cardDetails?.price,
        stock_number: vehicleData.cardDetails?.stock_number,
        miles: vehicleData.cardDetails?.miles,
        mechanical_info: vehicleData.cardDetails?.mechanical_info,
        additional_spec_and_info: vehicleData.cardDetails?.additional_spec_and_info,
        image: vehicleData.cardDetails?.image || [],
      });
    }
  }, [vehicleData, form]);

  return (
    <Modal centered title="Vehicle Update" footer="" open={isModalOpen} onCancel={handleCancel}>
      <div className="my-5">
        <div className="flex items-center gap-3">
          <h3 className="text-[16px] font-bold">Vehicle:</h3>
          <p className="font-medium">{vehicleData?.cardDetails.vehicle_number}</p>
        </div>
        <div className="mt-3 mb-5">
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item key="keys" name="keys" rules={[{ required: true, message: 'Please enter key' }]}>
                  <Input
                    type="number"
                    value={nameValue.keys}
                    onChange={(e) => setNameValue({ ...nameValue, keys: +e.target.value })}
                    label="Key"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key="owner" name="owner" rules={[{ required: true, message: 'Please enter owner' }]}>
                  <Input
                    type="number"
                    value={nameValue.owner}
                    onChange={(e) => setNameValue({ ...nameValue, owner: +e.target.value })}
                    label="Owner"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item key="price" name="price" rules={[{ required: true, message: 'Please enter price' }]}>
                  <Input
                    type="number"
                    value={nameValue.price}
                    onChange={(e) => setNameValue({ ...nameValue, price: +e.target.value })}
                    label="Price"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  key="stock_number"
                  name="stock_number"
                  rules={[{ required: true, message: 'Please enter stock number' }]}
                >
                  <Input
                    type="number"
                    value={nameValue.stock_number}
                    onChange={(e) => setNameValue({ ...nameValue, stock_number: +e.target.value })}
                    label="Stock Number"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item key="miles" name="miles" rules={[{ required: true, message: 'Please enter miles' }]}>
              <Input
                type="number"
                value={nameValue.miles}
                onChange={(e) => setNameValue({ ...nameValue, miles: +e.target.value })}
                label="Miles"
              />
            </Form.Item>

            <Form.Item
              key="mechanical_info"
              name="mechanical_info"
              label="Mechanical Info"
              rules={[{ required: true, message: 'Please enter mechanical info' }]}
            >
              <TextArea showCount maxLength={200} />
            </Form.Item>
            <Form.Item
              key="additional_spec_and_info"
              name="additional_spec_and_info"
              label="Additional Spec and Information"
              rules={[{ required: true, message: 'Please enter additional spec and information' }]}
            >
              <TextArea showCount maxLength={200} />
            </Form.Item>
            <Form.Item label="Vehicle Images">
              <ImageUpload fileList={fileList} onChange={setFileList} />
            </Form.Item>

            <div className="flex justify-end items-center -mb-5 mt-5 gap-2">
              <Button type="primary" htmlType="submit" className="!font-semibold">
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default VehicleUpdateModel;
