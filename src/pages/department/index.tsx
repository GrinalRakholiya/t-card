import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnType } from 'rc-table';
import { IoMdAdd } from 'react-icons/io';
import { intersection } from 'lodash';

import { AppState } from '../../redux/store.ts';
import Button from '../../components/button/index.tsx';
import { deleteDepartmentAction, getDepartmentAction } from '../../redux/actions/departmentAction.ts';
import { convertedDepartment } from './utils.ts';
import { DepartmentAction, DEPARTMENT_COLUMNS } from './constant.tsx';
import Table from '../../components/table/index.tsx';
import { DepartmentInterface } from './types.ts';
import UpdateDepartmentModal from '../../components/updateDepartmentModal/index.tsx';
import Loader from '../../components/loader/index.tsx';
import useNotification from '../../hooks/useNotification.ts';
import { setError } from '../../redux/slices/departmentSlice.ts';
import usePagination from '../../hooks/usePagination.ts';

const Department: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<DepartmentInterface | undefined>();
  const { department, count, error, isLoading } = useSelector((state: AppState) => state.department);
  const routePermissions = useSelector((state: AppState) => state.auth.routePermissions);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { pagination, handleTableChange } = usePagination(10, count);
  const data = convertedDepartment(department);

  const handleUpdateAction = (data: DepartmentInterface): void => {
    setIsModalOpen(true);
    setUpdateData(data);
  };

  const handleDelete = (data: DepartmentInterface): void => {
    deleteDepartmentAction(data.department_id, pagination.current, pagination.pageSize);
  };

  const handleCloseNotification = (): void => {
    setError(null);
  };

  useEffect(() => {
    if (error) {
      openNotificationWithIcon({
        type: 'error',
        message: error.message,
        description: '',
        onClose: handleCloseNotification,
      });
    }
  }, [error, openNotificationWithIcon]);

  useEffect(() => {
    getDepartmentAction(pagination.current, pagination.pageSize);
  }, [pagination, pagination.pageSize]);

  const columns = [...DEPARTMENT_COLUMNS];
  if (intersection(routePermissions, ['update', 'delete']).length) {
    columns.push({
      title: 'Action',
      key: 'x',
      render: (_: DepartmentInterface, record: DepartmentInterface): React.ReactNode => (
        <DepartmentAction
          page={pagination.current}
          limit={pagination.pageSize}
          data={record}
          onDelete={routePermissions?.includes('delete') ? (): void => handleDelete(record) : undefined}
          onUpdate={routePermissions?.includes('update') ? (): void => handleUpdateAction(record) : undefined}
        />
      ),
    } as unknown as ColumnType<Record<string, unknown>>);
  }

  return (
    <div>
      {contextHolder}
      {isLoading && <Loader />}
      <div className="flex icon justify-between py-7 px-8 border-b border-gray-10">
        <h3 className="text-[24px] text-secondary-60 font-semibold">Departments</h3>
        {routePermissions?.includes('create') && (
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setUpdateData(undefined);
            }}
            className="!font-semibold !flex items-center gap-2"
            type="primary"
          >
            <IoMdAdd className="text-[22px]" /> Add department
          </Button>
        )}
      </div>
      <div className="mt-8 px-8">
        <Table columns={columns} dataSource={data} bordered onChange={handleTableChange} pagination={pagination} />
      </div>
      <UpdateDepartmentModal
        page={pagination.current}
        limit={pagination.pageSize}
        isModalOpen={isModalOpen}
        updateData={updateData}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Department;
