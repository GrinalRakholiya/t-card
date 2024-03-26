import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { rolesColumns } from './constant.tsx';
import { AppState } from '../../redux/store.ts';
import { getRolesAction } from '../../redux/actions/rolesAction.ts';
import { setError } from '../../redux/slices/rolesSlice.ts';
import { convertedRoles } from './utils.ts';
import Table from '../../components/table/index.tsx';
import Button from '../../components/button/index.tsx';
import AddRoleModal from '../../components/addRoleModal/index.tsx';
import Loader from '../../components/loader/index.tsx';
import useNotification from '../../hooks/useNotification.ts';
import usePagination from '../../hooks/usePagination.ts';

const Roles: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { roles, isLoading, error, count } = useSelector((state: AppState) => state.roles);
  const routePermissions = useSelector((state: AppState) => state.auth.routePermissions);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { pagination, handleTableChange } = usePagination(10, count);
  const data = convertedRoles(roles);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseNotification = (): void => {
    setError(null);
  };

  useEffect(() => {
    getRolesAction(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

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

  return (
    <div>
      {contextHolder}
      {isLoading && <Loader />}
      <div className="flex icon justify-between py-7 px-8 border-b border-gray-10">
        <h3 className="text-[24px] text-secondary-60 font-semibold">Roles</h3>
        {routePermissions?.includes('create') && (
          <Button onClick={() => handleOpenModal()} className="!font-semibold !flex items-center gap-2" type="primary">
            <IoMdAdd className="text-[22px]" /> Add roles
          </Button>
        )}
      </div>
      <div className="mt-8 px-8">
        <Table
          columns={rolesColumns(pagination.current, pagination.pageSize, routePermissions)}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          bordered
        />
      </div>
      <AddRoleModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        page={pagination.current}
        limit={pagination.pageSize}
      />
    </div>
  );
};

export default Roles;
