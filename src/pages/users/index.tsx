import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getUsersAction } from '../../redux/actions/usersAction.ts';
import { AppState } from '../../redux/store.ts';
import { UsersColumns } from './constant.tsx';
import Button from '../../components/button/index.tsx';
import Table from '../../components/table/index.tsx';
import { convertedUsers } from './utils.ts';
import AddUserModal from '../../components/addUserModal/index.tsx';
import useNotification from '../../hooks/useNotification.ts';
import { setError } from '../../redux/slices/usersSlice.ts';
import Loader from '../../components/loader/index.tsx';
import usePagination from '../../hooks/usePagination.ts';

const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { users, count, error, isLoading } = useSelector((state: AppState) => state.users);
  const routePermissions = useSelector((state: AppState) => state.auth.routePermissions);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { pagination, handleTableChange } = usePagination(10, count);
  const data = convertedUsers(users);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
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
    getUsersAction(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  return (
    <div>
      {contextHolder}
      {isLoading && <Loader />}
      <div className="flex icon justify-between py-7 px-8 border-b border-gray-10">
        <h3 className="text-[24px] text-secondary-60 font-semibold">Users</h3>
        {routePermissions?.includes('create') && (
          <Button onClick={handleOpenModal} className="!font-semibold !flex items-center gap-2" type="primary">
            <IoMdAdd className="text-[22px]" /> Add user
          </Button>
        )}
      </div>
      <div className="mt-8 px-8">
        <Table
          columns={UsersColumns(pagination.current, pagination.pageSize, routePermissions)}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          bordered
        />
      </div>
      <AddUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        page={pagination.current}
        limit={pagination.pageSize}
      />
    </div>
  );
};

export default Users;
