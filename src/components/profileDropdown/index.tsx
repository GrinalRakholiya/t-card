import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import { FiActivity } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import { useNavigate } from 'react-router';

import { logoutAction } from '../../redux/actions/authActions.ts';
import avatarImg from '../../assets/images/avatar.jpg';

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOutClick = (): void => {
    logoutAction();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="flex items-center gap-2 cursor-pointer">
          <div>
            <img className="rounded-full h-10 w-10" src={avatarImg} alt="avatar" />
          </div>
          <div className="">
            <h3 className="capitalize text-gray-60 font-bold">Admin</h3>
            {/* <p className="text-gray-60 text-xs leading-normal">carolyn.p@elstar.com</p> */}
          </div>
        </div>
      ),
      key: '0',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div className="flex items-center gap-3 cursor-pointer text-secondary-80 text-sm font-semibold">
          <LuUser2 className="text-[18px]" />
          <span>profile</span>
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div className="flex items-center gap-3 cursor-pointer text-secondary-80 text-sm font-semibold">
          <IoSettingsOutline className="text-[18px]" />
          <span>Account setting</span>
        </div>
      ),
      key: '3',
    },
    {
      label: (
        <div className="flex items-center gap-3 cursor-pointer text-secondary-80 text-sm font-semibold">
          <FiActivity className="text-[18px]" />
          <span>Activity Log</span>
        </div>
      ),
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <button
          type="button"
          onClick={handleSignOutClick}
          className="flex items-center gap-3 cursor-pointer text-secondary-80 text-sm font-semibold"
        >
          <GoSignOut className="text-[18px]" />
          <span>Sign Out</span>
        </button>
      ),
      key: '6',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <div className="flex items-center gap-2 cursor-pointer">
        <div>
          <img className="rounded-full h-8 w-8" src={avatarImg} alt="avatar" />
        </div>
        <div className="text-gray-60">
          {/* <h3 className="text-xs capitalize">admin</h3> */}
          <p className="font-bold leading-normal">Admin </p>
        </div>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
