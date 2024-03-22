/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
import { ColumnType } from 'rc-table';
import TableActions from '../../components/tableAction/index.tsx';
import { VehicleInterface } from './type.ts';
import ShowQrModal from '../../components/showQrModal/index.tsx';

interface ActionProps {
  data: VehicleInterface;
  onDelete: (data: VehicleInterface) => void;
  onUpdate: (data: VehicleInterface) => void;
  page: number;
  limit: number;
  onView: (data: VehicleInterface) => void;
}

export const VEHICLE_COLUMNS = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 70,
    align: 'center',
  },
  {
    title: 'Vehicle number',
    dataIndex: 'vehicle_number',
    key: 'vehicle_number',
    width: 170,
    align: 'center',
  },
  {
    title: 'Qr code',
    dataIndex: 'qr_code',
    key: 'qr_code',
    width: 120,
    align: 'center',
    render: (qr_code): ReactNode => <ShowQrModal qr={qr_code} />,
  },
  {
    title: 'Key tag',
    dataIndex: 'key_tag',
    key: 'key_tag',
    width: 100,
    align: 'center',
  },
  {
    title: 'Parked at',
    dataIndex: 'parked_at',
    key: 'parked_at',
    width: 140,
    align: 'center',
  },
  {
    title: 'Site name',
    dataIndex: 'site_name',
    key: 'site_name',
    width: 200,
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 200,
    align: 'center',
  },
  {
    title: 'Registration letter',
    dataIndex: 'registration_letter',
    width: 180,
    key: 'registration_letter',
    render: (registration_letter: { year: string; letters: string }): ReactNode => (
      <span>
        <h3 className="text-secondary">
          Year: <span className="text-secondary-30">{registration_letter?.year}</span>
        </h3>
        <h3 className="text-secondary">
          Letter: <span className="text-secondary-30">{registration_letter?.letters}</span>
        </h3>
      </span>
    ),
  },
  {
    title: 'Registration date',
    dataIndex: 'registration_date',
    key: 'registration_date',
    align: 'center',
  },
  {
    title: 'Drive side',
    dataIndex: 'drive_side',
    key: 'drive_side',
    render: (driver_side: { dataCode: string; displayText: string }): ReactNode => (
      <span>
        <h3 className="text-secondary">
          Data code: <span className="text-secondary-30">{driver_side?.dataCode}</span>
        </h3>
        <h3 className="text-secondary">
          Display text: <span className="text-secondary-30">{driver_side?.displayText}</span>
        </h3>
      </span>
    ),
  },
  {
    title: 'Vehicle type',
    dataIndex: 'vehicle_type',
    key: 'vehicle_type',
    width: 100,
    align: 'center',
  },
  {
    title: 'Manufactured date',
    dataIndex: 'manufactured_date',
    key: 'manufactured_date',
    width: 150,
    align: 'center',
  },
  {
    title: 'Make',
    dataIndex: 'make',
    key: 'make',
    width: 150,
    align: 'center',
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    width: 150,
    align: 'center',
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 150,
    align: 'center',
    sorter: (a: VehicleInterface, b: VehicleInterface): number => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return dateA - dateB;
    },
  },
] as ColumnType<Record<string, unknown>>[];

export const VehiclesAction: React.FC<ActionProps> = ({ data, onDelete, page, limit, onView, onUpdate }) => (
  <TableActions
    data={data}
    onDelete={onDelete}
    onUpdate={onUpdate}
    page={page}
    onView={onView}
    limit={limit}
    deletePopupTitle="Delete this vehicle"
    deletePopupDesc="Are you sure to delete this vehicle?"
  />
);
