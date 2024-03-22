import React, { ReactNode } from 'react';
import { ColumnType } from 'rc-table';
import RoleAction from '../../components/tableAction/index.tsx';
import { RoleInterface } from './types.ts';
import { deleteRolesAction } from '../../redux/actions/rolesAction.ts';

const handleDelete = (data: RoleInterface, page: number, limit: number): void => {
  deleteRolesAction(data.role_id, page, limit);
};

export const rolesColumns = (
  page: number,
  limit: number,
  routePermissions: string[]
): ColumnType<Record<string, unknown>>[] => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: RoleInterface, b: RoleInterface): number => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();

        return dateA - dateB;
      },
    },
  ] as ColumnType<Record<string, unknown>>[];

  if (routePermissions?.includes('delete')) {
    columns.push({
      title: 'Action',
      dataIndex: 'actions',
      key: 'x',
      render: (_: RoleInterface, record: RoleInterface): ReactNode => (
        <RoleAction
          data={record}
          page={page}
          limit={limit}
          onDelete={() => handleDelete(record, page, limit)}
          deletePopupTitle="Delete this role"
          deletePopupDesc="Are you sure to delete this role?"
        />
      ),
    } as unknown as ColumnType<Record<string, unknown>>);
  }
  return columns;
};
