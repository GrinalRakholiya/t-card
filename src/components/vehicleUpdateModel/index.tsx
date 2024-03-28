import { Form, Row, Col, Input as AntdInput } from 'antd';
import Modal from '../modal/index.tsx';
import Button from '../button/index.tsx';
import Input from '../inputField/index.tsx';
import { VehicleUpdateModelProps } from './types.ts';

const VehicleUpdateModel: React.FC<VehicleUpdateModelProps> = ({ isModalOpen, setIsModalOpen, vehicleData }) => {
  const [form] = Form.useForm();

  const onFinish = (): void => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const { TextArea } = AntdInput;

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
                <Form.Item label="Keys" name="keys" rules={[{ message: 'Please enter key' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Owner" name="owner" rules={[{ message: 'Please enter owner' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Price" name="price" rules={[{ message: 'Please enter price' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Stock Number"
                  name="stock number"
                  rules={[{ required: false, message: 'Please enter stock number' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Miles" name="miles" rules={[{ message: 'Please enter miles' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Mechanical info"
              name="mechanical info"
              rules={[{ required: true, message: 'Please enter mechanical info' }]}
            >
              <TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              label="Additional Spec and Information"
              name="additional spec and information"
              rules={[{ required: true, message: 'Please enter additional spec and information' }]}
            >
              <TextArea showCount maxLength={100} />
            </Form.Item>

            <div className="flex justify-end items-center -mb-5 mt-5 gap-2">
              <Button onClick={handleCancel}>Cancel</Button>
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
