/* eslint-disable no-unused-vars */
import React from 'react';
import { ColumnType } from 'rc-table';
import { DepartmentInterface } from './types.ts';
import TableActions from '../../components/tableAction/index.tsx';

interface ActionProps {
  data: DepartmentInterface;
  onDelete?: (data: DepartmentInterface) => void;
  onUpdate?: (data: DepartmentInterface) => void;
  page: number;
  limit: number;
}

export const DEPARTMENT_COLUMNS = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: (a: DepartmentInterface, b: DepartmentInterface): number => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return dateA - dateB;
    },
  },
] as ColumnType<Record<string, unknown>>[];

export const DepartmentAction: React.FC<ActionProps> = ({ data, onDelete, onUpdate, page, limit }) => (
  <TableActions
    data={data}
    onDelete={onDelete}
    page={page}
    limit={limit}
    onUpdate={onUpdate}
    deletePopupTitle="Delete this department"
    deletePopupDesc="Are you sure to delete this department?"
  />
);
