import { useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { ColumnType } from 'rc-table';
import { useSelector } from 'react-redux';
import { setError } from '../redux/slices/vehiclesSlice.ts';
import useNotification from './useNotification.ts';
import { AppState } from '../redux/store.ts';
import { deleteVehicleAction, getVehicleAction } from '../redux/actions/vehiclesAction.ts';
import usePagination, { PaginationConfig } from './usePagination.ts';
import { convertedVehicles } from '../pages/vehicle/utils.tsx';
import { VehicleInterface } from '../pages/vehicle/type.ts';
import { VEHICLE_COLUMNS, VehiclesAction } from '../pages/vehicle/constant.tsx';

type PropType = {
  data: Record<string, unknown>[];
  viewData: VehicleInterface | undefined;
  isLoading: boolean;
  contextHolder: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  pagination: PaginationConfig;
  isModalOpen: boolean;
  isUpdateOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
  columns: ColumnType<Record<string, unknown>>[];
};

const useVehicle = (): PropType => {
  const [viewData, setviewData] = useState<VehicleInterface | undefined>();
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { vehicles, count, isLoading, error } = useSelector((state: AppState) => state.vehicles);
  const { pagination, handleTableChange } = usePagination(5, count);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const data = convertedVehicles(vehicles);

  const handleCloseNotification = (): void => {
    setError(null);
  };

  const handleDelete = (data: VehicleInterface): void => {
    deleteVehicleAction(data.qr_code, pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    getVehicleAction(pagination.current, pagination.pageSize);
  }, [pagination, pagination.pageSize]);

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

  const handleViewData = (data: VehicleInterface): void => {
    setviewData(data);
    setIsModalOpen(true);
  };

  const handleUpdate = (data: VehicleInterface): void => {
    setIsUpdateOpen(true);
    setviewData(data);
  };

  const columns = [
    ...VEHICLE_COLUMNS,
    {
      title: 'Action',
      key: 'x',
      fixed: 'right',
      width: 100,
      render: (_: VehicleInterface, record: VehicleInterface): React.ReactNode => (
        <VehiclesAction
          page={pagination.current}
          limit={pagination.pageSize}
          data={record}
          onUpdate={() => handleUpdate(record)}
          onDelete={() => handleDelete(record)}
          onView={() => handleViewData(record)}
        />
      ),
    } as unknown as ColumnType<Record<string, unknown>>,
  ];

  return {
    columns,
    data,
    contextHolder,
    viewData,
    isLoading,
    pagination,
    isModalOpen,
    isUpdateOpen,
    setIsModalOpen,
    setIsUpdateOpen,
    handleTableChange,
  };
};

export default useVehicle;
