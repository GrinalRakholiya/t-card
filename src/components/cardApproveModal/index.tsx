import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store.ts';
import Modal from '../modal/index.tsx';
import Button from '../button/index.tsx';
import Select from '../select/index.tsx';
import { DepartmentInterface } from '../../pages/department/types.ts';
import { ApprovePayloadInterface, CardApproveModalProps } from './type.ts';
import { approveVehicleAction } from '../../redux/actions/liveStatusCardActions.ts';

const CardApproveModal: React.FC<CardApproveModalProps> = ({ isModalOpen, setIsModalOpen, cardData }) => {
  const [nameValue, setNameValue] = useState<ApprovePayloadInterface>({
    approved: true,
    parked_at: '',
    department_id: '',
  });
  const [rejectValue, setRejectValue] = useState({
    approved: false,
    parked_at: '',
  });
  const departments = useSelector((state: AppState) => state.department.department);
  const [departmentData, setdepartmentData] = useState<DepartmentInterface[]>();
  const [form] = Form.useForm();
  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const onFinish = (): void => {
    setIsModalOpen(false);
    approveVehicleAction(cardData?.cardDetails.qr_code, nameValue);
    form.resetFields();
  };

  const handleRejected = (): void => {
    setIsModalOpen(false);
    approveVehicleAction(cardData?.cardDetails.qr_code, rejectValue);
    console.log(rejectValue);
  };

  useEffect(() => {
    if (cardData) {
      setNameValue({ ...nameValue, parked_at: cardData?.cardDetails.parked_at });
      setRejectValue({ ...rejectValue, parked_at: cardData?.cardDetails.parked_at });
    }
  }, [cardData]);

  useEffect(() => {
    if (departments && departments.length) {
      const lowestSequence = Math.min(...departments.map((dept: DepartmentInterface) => dept.sequence));
      const lowestSequenceDepartments = departments.filter(
        (dept: DepartmentInterface) => dept.sequence === lowestSequence
      );
      setdepartmentData(lowestSequenceDepartments);
    }
  }, [departments]);

  return (
    <Modal centered title="Approve vehicle" footer="" open={isModalOpen} onCancel={handleCancel}>
      <div className="my-5">
        <div className="flex items-center gap-3">
          <h3 className="text-[16px] font-bold">Vehicle:</h3>
          <p className="font-medium">{cardData?.cardDetails.vehicle_number}</p>
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
            <div>
              <Form.Item
                key="department"
                name="department"
                rules={[{ required: true, message: `Please select department` }]}
              >
                <Select
                  label="Assign department"
                  value={nameValue.department_id}
                  onChange={(value) => setNameValue({ ...nameValue, department_id: value })}
                  className="!w-full !py-0 !h-[40px]"
                  placeholder="Please select department"
                  options={departmentData?.map((val: DepartmentInterface) => ({
                    value: val.department_id,
                    label: val.department,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="flex justify-end items-center -mb-5 mt-5 gap-2">
              <Button onClick={handleRejected}>Reject</Button>
              <Button type="primary" htmlType="submit" className="!font-semibold">
                Approve
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CardApproveModal;
