import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { AddUserInterface, DynamicAddUserType } from '../../pages/users/types.ts';
import Modal from '../modal/index.tsx';
import Button from '../button/index.tsx';
import Input from '../inputField/index.tsx';
import { data, fieldConfig } from './constant.ts';
import { addUserAction } from '../../redux/actions/usersAction.ts';
import Select from '../select/index.tsx';
import { AppState } from '../../redux/store.ts';
import { RoleInterface } from '../../pages/roles/types.ts';
import { getRolesAction } from '../../redux/actions/rolesAction.ts';
import { getDepartmentAction } from '../../redux/actions/departmentAction.ts';
import { getSitesAction } from '../../redux/actions/sitesAction.ts';
import { DepartmentInterface } from '../../pages/department/types.ts';
import { SitesInterface } from '../../pages/sites/type.ts';

interface AddUserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  limit: number;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isModalOpen, setIsModalOpen, page, limit }) => {
  const [nameValue, setNameValue] = useState<AddUserInterface>(data);
  const [form] = Form.useForm();

  const roles = useSelector((state: AppState) => state.roles.roles);
  const departments = useSelector((state: AppState) => state.department.department);
  const sites = useSelector((state: AppState) => state.sites.sites);

  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  const onFinish = (): void => {
    setIsModalOpen(false);
    addUserAction(nameValue, page, limit);
    form.resetFields();
  };

  useEffect(() => {
    getRolesAction();
    getDepartmentAction();
    getSitesAction();
  }, []);

  return (
    <Modal title="Add user" footer="" centered open={isModalOpen} onOk={handleClose} onCancel={handleClose}>
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
            {fieldConfig.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                rules={[{ required: true, message: `Please input your ${field.label.toLowerCase()}!` }]}
              >
                <Input
                  value={nameValue[field.name as keyof DynamicAddUserType]}
                  onChange={(e) => setNameValue({ ...nameValue, [field.name]: e.target.value })}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              </Form.Item>
            ))}
            <Form.Item key="role_id" name="role_id" rules={[{ required: true, message: `Please select role` }]}>
              <Select
                label="Role"
                value={nameValue.assigned_site}
                onChange={(value) => setNameValue({ ...nameValue, role_id: value })}
                className="!w-full !py-0 !h-[40px]"
                placeholder="Please select role"
                options={roles.map((role: RoleInterface) => ({
                  value: role.role_id,
                  label: role.role,
                }))}
              />
            </Form.Item>
            <Form.Item
              key="assigned_site"
              name="assigned_site"
              rules={[{ required: true, message: `Please select site` }]}
            >
              <Select
                label="Assigned site"
                value={nameValue.assigned_site}
                onChange={(value) => setNameValue({ ...nameValue, assigned_site: value })}
                className="!w-full !py-0 !h-[40px]"
                placeholder="Please select site"
                options={sites.map((val: SitesInterface) => ({
                  value: val.site_id,
                  label: val.site_name,
                }))}
              />
            </Form.Item>
            <Form.Item
              key="assigned_department"
              name="assigned_department"
              rules={[{ required: true, message: `Please select department` }]}
            >
              <Select
                label="Assigned department"
                value={nameValue.assigned_department}
                onChange={(value) => setNameValue({ ...nameValue, assigned_department: value })}
                className="!w-full !py-0 !h-[40px]"
                placeholder="Please select department"
                options={departments.map((val: DepartmentInterface) => ({
                  value: val.department_id,
                  label: val.department,
                }))}
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

export default AddUserModal;
