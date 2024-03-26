import React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/es/table';
import './tableStyle.scss';

const Table: React.FC<TableProps<Record<string, unknown>>> = ({ dataSource, columns, ...others }) => (
  <AntdTable dataSource={dataSource} columns={columns} {...others} />
);

export default Table;
