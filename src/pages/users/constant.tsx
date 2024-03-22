import { ReactNode } from 'react';
import { ColumnType } from 'rc-table';
import { intersection } from 'lodash';

import { UserInterface } from './types.ts';
import UserAction from '../../components/tableAction/index.tsx';
import { deleteUserAction } from '../../redux/actions/usersAction.ts';
import { UserDataType } from '../../types/UserTypes.ts';

const handleDelete = (data: UserInterface, page: number, limit: number): void => {
  deleteUserAction(data.id, page, limit);
};

const handleResetPassword = (): void => {};

export const UsersColumns = (
  page: number,
  limit: number,
  routePermissions: string[]
): ColumnType<Record<string, unknown>>[] => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      sorter: (a: UserDataType, b: UserDataType): number => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();

        return dateA - dateB;
      },
    },
  ] as ColumnType<Record<string, unknown>>[];

  if (intersection(routePermissions, ['update', 'delete']).length) {
    columns.push({
      title: 'Action',
      dataIndex: 'actions',
      key: 'x',
      render: (_: UserInterface, record: UserInterface): ReactNode => (
        <UserAction
          data={record}
          page={page}
          limit={limit}
          onDelete={routePermissions?.includes('delete') ? (): void => handleDelete(record, page, limit) : undefined}
          onResetPassword={routePermissions?.includes('update') ? handleResetPassword : undefined}
          deletePopupTitle="Delete this user"
          deletePopupDesc="Are you sure to delete this user?"
        />
      ),
    } as unknown as ColumnType<Record<string, unknown>>);
  }

  return columns;
};
