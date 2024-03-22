import React from 'react';
import { Button, Layout } from 'antd';
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from 'react-icons/hi';
import ProfileDropdown from '../profileDropdown/index.tsx';
import NotificationPanel from '../notificationPanel/index.tsx';

const { Header } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const TopHeader: React.FC<SidebarProps> = ({ collapsed, setCollapsed, title }) => (
  <Header
    style={{ padding: 0, background: '#fff' }}
    className="bg-white border-b border-solid border-gray-10 !px-6 flex items-center justify-between"
  >
    <div className="flex gap-5 items-center">
      <Button
        type="text"
        icon={collapsed ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
        onClick={() => setCollapsed(!collapsed)}
        className="!text-[22px] !text-primary"
      />
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    </div>
    <div className="flex items-center gap-5">
      <NotificationPanel />
      <ProfileDropdown />
    </div>
  </Header>
);

export default TopHeader;
