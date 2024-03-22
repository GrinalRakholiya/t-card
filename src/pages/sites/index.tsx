import React, { useEffect, useState, useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { ColumnType } from 'rc-table';
import { intersection, isEmpty } from 'lodash';

import Button from '../../components/button/index.tsx';
import Table from '../../components/table/index.tsx';
import { SITES_COLUMNS } from './constant.tsx';
import { AppState } from '../../redux/store.ts';
import { deleteSitesAction, getSitesAction } from '../../redux/actions/sitesAction.ts';
import { convertedSites } from './utils.ts';
import { SitesInterface } from './type.ts';
import SitesAction from '../../components/tableAction/index.tsx';
import SitesModal from '../../components/sitesModal/index.tsx';
import Loader from '../../components/loader/index.tsx';
import useNotification, { NotificationType } from '../../hooks/useNotification.ts';
import { setError } from '../../redux/slices/sitesSlice.ts';
import usePagination from '../../hooks/usePagination.ts';

const Sites: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<SitesInterface | undefined>();

  const notificationsRef = useRef<Record<string, number>>({});
  const { sites, count, error, isLoading } = useSelector((state: AppState) => state.sites);
  const { pagination, handleTableChange } = usePagination(10, count);
  const routePermissions = useSelector((state: AppState) => state.auth.routePermissions);
  const { openNotificationWithIcon, contextHolder, destroy } = useNotification();
  const data = convertedSites(sites);

  const handleUpdateAction = (data: SitesInterface): void => {
    setIsModalOpen(true);
    setUpdateData(data);
  };

  const handleDelete = (data: SitesInterface): void => {
    deleteSitesAction(data.site_id, pagination.current, pagination.pageSize);
  };

  const handleCloseNotification = (): void => {
    setError(null);
  };

  const columns = [...SITES_COLUMNS];

  if (intersection(routePermissions, ['update', 'delete']).length) {
    columns.push({
      title: 'Action',
      key: 'x',
      render: (_: SitesInterface, record: SitesInterface): React.ReactNode => (
        <SitesAction
          data={record}
          page={pagination.current}
          limit={pagination.pageSize}
          onDelete={routePermissions?.includes('delete') ? (): void => handleDelete(record) : undefined}
          onUpdate={routePermissions?.includes('update') ? (): void => handleUpdateAction(record) : undefined}
          deletePopupTitle="Delete this site"
          deletePopupDesc="Are you sure to delete this site?"
        />
      ),
    } as unknown as ColumnType<Record<string, unknown>>);
  }

  useEffect(() => {
    if (!isEmpty(error)) {
      const key = `notification-${Date.now()}`;
      const notificationData = {
        type: 'error' as NotificationType,
        message: error.message || 'Something went wrong. Please try again!',
        description: '',
      };
      openNotificationWithIcon({
        key,
        onClose: handleCloseNotification,
        ...notificationData,
      });
      notificationsRef.current[key] = Date.now(); // Update the ref
    }
  }, [error]);

  // Close all notifications when the component unmounts
  useEffect(() => {
    const currentNotifications = notificationsRef.current;
    return () => {
      Object.keys(currentNotifications).forEach((key) => {
        destroy(key);
      });
      setError(null);
    };
  }, []);

  useEffect(() => {
    getSitesAction(pagination.current, pagination.pageSize);
  }, [pagination]);

  return (
    <div>
      {contextHolder}
      {isLoading && <Loader />}
      <div className="flex icon justify-between py-7 px-8 border-b border-gray-10">
        <h3 className="text-[24px] text-secondary-60 font-semibold">Sites</h3>
        {routePermissions?.includes('create') && (
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setUpdateData(undefined);
            }}
            className="!font-semibold !flex items-center gap-2"
            type="primary"
          >
            <IoMdAdd className="text-[22px]" /> Add Sites
          </Button>
        )}
      </div>
      <div className="mt-8 px-8">
        <Table columns={columns} dataSource={data} bordered onChange={handleTableChange} pagination={pagination} />
      </div>
      <SitesModal
        page={pagination.current}
        limit={pagination.pageSize}
        updateData={updateData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Sites;
