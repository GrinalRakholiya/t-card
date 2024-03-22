import { ReactNode } from 'react';
import { ColumnType } from 'rc-table';

import { SitesInterface } from './type.ts';

export const SITES_COLUMNS = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'Site name',
    dataIndex: 'site_name',
    key: 'site_name',
    align: 'center',
  },
  {
    title: 'Site address',
    dataIndex: 'site_address',
    key: 'site_address',
    align: 'center',
  },
  {
    title: 'Site coordinates',
    dataIndex: 'site_coordinates',
    key: 'site_coordinates',
    align: 'center',
    render: (coordinates: { lat: number; long: number }): ReactNode => (
      <span>
        <h3 className="text-secondary">
          Latitude: <span className="text-secondary-30">{coordinates?.lat}</span>
        </h3>
        <h3 className="text-secondary">
          Longitude: <span className="text-secondary-30">{coordinates?.long}</span>
        </h3>
      </span>
    ),
  },
  {
    title: 'Site Working days',
    dataIndex: 'working_days',
    key: 'working_days',
    align: 'center',
  },
  {
    title: 'Site start time',
    dataIndex: 'working_start_time',
    key: 'working_start_time',
    align: 'center',
  },
  {
    title: 'Site end time',
    dataIndex: 'working_end_time',
    key: 'working_end_time',
    align: 'center',
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    align: 'center',
    sorter: (a: SitesInterface, b: SitesInterface): number => {
      const dateA = new Date(a.created_at as string).getTime();
      const dateB = new Date(b.created_at as string).getTime();

      return dateA - dateB;
    },
  },
] as ColumnType<Record<string, unknown>>[];
