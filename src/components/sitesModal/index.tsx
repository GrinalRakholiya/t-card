import React, { useEffect, useState } from 'react';
import { Form, FormRule } from 'antd';
import { valueType } from 'antd/es/statistic/utils';
import moment from 'moment';

import { UpdateSiteModalInterface, HoursINterface } from './types.ts';
import Button from '../button/index.tsx';
import Input from '../inputField/index.tsx';
import Select from '../select/index.tsx';
import Modal from '../modal/index.tsx';
import { addSitesAction, editSitesAction } from '../../redux/actions/sitesAction.ts';
import { FORM_CONFIG, SITE_DATA } from './constant.ts';
import { SitesInterface } from '../../pages/sites/type.ts';
import useNotification from '../../hooks/useNotification.ts';
import { setError } from '../../redux/slices/sitesSlice.ts';

const SitesModal: React.FC<UpdateSiteModalInterface> = ({ isModalOpen, page, limit, updateData, setIsModalOpen }) => {
  const [nameValue, setNameValue] = useState<SitesInterface>(SITE_DATA);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const [hours, setHours] = useState<HoursINterface[]>([]);

  const [form] = Form.useForm();

  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  const handleCloseNotification = (): void => {
    setError(null);
  };

  const onFinish = async (): Promise<void> => {
    try {
      await form.validateFields();
      setIsModalOpen(false);
      const formData = form.getFieldsValue();

      const siteData = {
        site_name: formData.site_name,
        site_address: formData.site_address,
        site_coordinates: {
          lat: parseFloat(formData.site_coordinates_lat),
          long: parseFloat(formData.site_coordinates_long),
        },
        working_days: +formData.working_days,
        working_start_time: formData.working_start_time,
        working_end_time: formData.working_end_time,
      };
      if (updateData) {
        editSitesAction(updateData.site_id, siteData, page, limit);
      } else {
        addSitesAction(siteData, page, limit);
      }
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
    if (updateData) {
      form.setFieldsValue({
        site_name: updateData.site_name,
        site_address: updateData.site_address,
        site_coordinates_lat: updateData.site_coordinates.lat,
        site_coordinates_long: updateData.site_coordinates.long,
        working_days: updateData.working_days,
        working_start_time: updateData.working_start_time,
        working_end_time: updateData.working_end_time,
      });
    } else {
      form.resetFields();
    }
  }, [updateData, form]);

  useEffect(() => {
    const hoursArray = [];
    for (let i = 0; i <= 24; i += 1) {
      hoursArray.push({
        value: `${i}:00`,
        label: `${i}:00`,
      });
      if (i < 24) {
        hoursArray.push({
          value: `${i}:30`,
          label: `${i}:30`,
        });
      }
    }
    setHours(hoursArray);
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        title={`${updateData ? 'Update' : 'Add'} Site`}
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
              {FORM_CONFIG.map(({ name, label, placeholder, rules, type }) => (
                <Form.Item key={name} name={name} rules={rules}>
                  {name.startsWith('site_coordinates') ? (
                    <Input
                      type="number"
                      value={name.endsWith('_lat') ? nameValue.site_coordinates.lat : nameValue.site_coordinates.long}
                      onChange={(e) =>
                        setNameValue({
                          ...nameValue,
                          site_coordinates: {
                            ...nameValue.site_coordinates,
                            [name.split('_')[2]]: parseFloat(e.target.value),
                          },
                        })
                      }
                      label={label}
                      placeholder={placeholder}
                    />
                  ) : (
                    <Input
                      value={nameValue[name as keyof SitesInterface] as valueType}
                      onChange={(e) => setNameValue({ ...nameValue, [name]: e.target.value })}
                      label={label}
                      type={type}
                      placeholder={placeholder}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item
                key={'working_days'}
                name={'working_days'}
                rules={[{ required: true, message: 'Please select site working days per week!' }]}
              >
                <Select
                  label="Site working days"
                  placeholder="Select wokring days"
                  className="!max-w-[200px] !w-full"
                  onChange={(value) => setNameValue({ ...nameValue, working_days: value })}
                  options={[
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                  ]}
                />
              </Form.Item>
              <Form.Item
                key={'start_time'}
                name={'working_start_time'}
                rules={[
                  { required: true, message: 'Please select site working start time!' },
                  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                  ({ getFieldValue }) => ({
                    validator: (_: FormRule, value: string): Promise<Error | void> => {
                      if (
                        !value ||
                        !getFieldValue('working_end_time') ||
                        moment(value, 'HH:mm') < moment(getFieldValue('working_end_time'), 'HH:mm')
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Start time must be before end time!'));
                    },
                  }),
                ]}
              >
                <Select
                  label="Site working start time"
                  placeholder="Select start time"
                  className="!max-w-[200px] !w-full"
                  onChange={(value) => setNameValue({ ...nameValue, working_start_time: value })}
                  options={hours}
                />
              </Form.Item>
              <Form.Item
                key={'end_time'}
                name={'working_end_time'}
                rules={[
                  { required: true, message: 'Please select site working end time!' },
                  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                  ({ getFieldValue }) => ({
                    validator: (_: FormRule, value: string): Promise<Error | void> => {
                      if (!value || moment(getFieldValue('working_start_time'), 'HH:mm') < moment(value, 'HH:mm')) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('End time must be after Start time!'));
                    },
                  }),
                ]}
              >
                <Select
                  label="Site working end time"
                  placeholder="Select end time"
                  className="!max-w-[200px] !w-full"
                  onChange={(value) => setNameValue({ ...nameValue, working_end_time: value })}
                  options={hours}
                />
              </Form.Item>
            </div>
            <div className="flex justify-end items-center -mb-5 mt-3 gap-2">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="!font-semibold">
                {updateData ? 'Update site' : 'Add site'}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SitesModal;
