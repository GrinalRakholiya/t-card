import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteOutline, MdOutlineLockReset } from 'react-icons/md';
import { VscEdit, VscEye } from 'react-icons/vsc';
import { ActionPropsInterface } from './types.ts';
import Popover from '../popover/index.tsx';
import Button from '../button/index.tsx';
import ResetPasswordModal from '../resetPasswordModal/index.tsx';
import { UserInterface } from '../../pages/users/types.ts';
import { RoleInterface } from '../../pages/roles/types.ts';
import { DepartmentInterface } from '../../pages/department/types.ts';
import { SitesInterface } from '../../pages/sites/type.ts';
import { VehicleInterface } from '../../pages/vehicle/type.ts';

type mainDataType = RoleInterface | UserInterface | DepartmentInterface | SitesInterface | VehicleInterface;

const TableActions: React.FC<ActionPropsInterface> = ({
  data,
  onResetPassword,
  onDelete,
  onUpdate,
  onView,
  deletePopupTitle,
  deletePopupDesc,
}) => {
  const [hide, setHide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUserName, setIsUserName] = useState<string>('');

  // eslint-disable-next-line
  const handleButtonClick = (callback: ((data: mainDataType) => void) | undefined): void => {
    if (callback) {
      if (callback === onResetPassword) {
        callback(data);
        setIsModalOpen(true);
        setIsUserName((data as UserInterface).user_name || '');
      } else {
        callback(data);
      }
    }
  };

  const cancel = (): void => {
    setHide(false);
  };

  const handleOpenChange = (newOpen: boolean): void => {
    setHide(newOpen);
  };

  const actions = [
    {
      label: 'View',
      icon: <VscEye className="text-lg" />,
      callback: onView,
    },
    { label: 'Reset password', icon: <MdOutlineLockReset className="text-lg" />, callback: onResetPassword },
    { label: 'Update', icon: <VscEdit className="text-lg" />, callback: onUpdate },
    {
      label: 'Delete',
      icon: <MdDeleteOutline className="text-lg" />,
      callback: onDelete,
    },
  ].filter((action) => action.callback);

  const content = (
    <div className="min-w-[150px] w-full flex-col">
      {actions.map(({ label, icon, callback }) => (
        <React.Fragment key={label}>
          {callback === onDelete ? (
            <Popconfirm
              placement="bottomRight"
              title={deletePopupTitle || `Delete this ${label.toLowerCase()}?`}
              description={deletePopupDesc || `Are you sure to delete this ${label.toLowerCase()}?`}
              onConfirm={() => {
                // eslint-disable-next-line
                handleButtonClick(callback as ((data: mainDataType) => void) | undefined);
                cancel();
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                className="!px-2 !pl-4 !rounded-none w-full !font-semibold !text-start !flex items-center gap-2"
                danger={callback === onDelete}
              >
                {icon}
                {label}
              </Button>
            </Popconfirm>
          ) : (
            <Button
              onClick={() => {
                // eslint-disable-next-line
                handleButtonClick(callback as ((data: mainDataType) => void) | undefined);
                cancel();
              }}
              type="text"
              className="!px-2 !pl-4 !rounded-none w-full !font-semibold !text-start !flex items-center gap-2"
            >
              {icon}
              {label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <>
      <Popover
        open={hide}
        placement="bottom"
        content={content}
        arrow={false}
        trigger={'click'}
        onOpenChange={handleOpenChange}
        style={{ padding: 0 }}
      >
        <Button onClick={() => setHide(true)} type="text" className="!px-1">
          <BsThreeDotsVertical className="text-[20px] text-primary" />
        </Button>
      </Popover>
      <ResetPasswordModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isUserName={isUserName} />
    </>
  );
};

export default TableActions;
