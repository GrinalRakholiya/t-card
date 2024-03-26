import React from 'react';
import { Button, Popover } from 'antd';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoMailOpenOutline } from 'react-icons/io5';
import Avatar from '../avatar/index.tsx';
import './notificationStyle.scss';

const content = (
  <div className="min-w-[360px] w-full notification-panel-main">
    <div className="flex justify-between items-center py-2 px-4 border-b border-gray-10">
      <h3 className="text-base text-secondary font-semibold">Notifications</h3>
      <IoMailOpenOutline className="text-[20px]" />
    </div>
    <div className="max-h-[230px] overflow-y-auto h-full">
      <div className="flex gap-3 justify-between p-4 border-b border-gray-10 hover:bg-gray-10 cursor-pointer">
        <div className="flex gap-3 items-center">
          <Avatar className="!bg-primary !text-white !h-10 !w-10">VK</Avatar>
          <div className="text-sm text-gray-60 font-normal">
            <h3>
              <span className="text-secondary-80 font-bold">Vickie Kim </span>comment in your ticket.
            </h3>
            <p>20 minutes ago</p>
          </div>
        </div>
        <div className="bg-primary w-2 h-2 rounded-full mt-1" />
      </div>
    </div>
    <div className="text-center py-2 px-4 flex items-center justify-center border-t border-gray-10">
      <button className="text-secondary-80 py-2 px-3 font-semibold" type="button">
        View All Activity
      </button>
    </div>
  </div>
);

const NotificationPanel: React.FC = () => (
  <Popover content={content} trigger={'click'} arrow={false} placement="bottomRight">
    <Button
      type="text"
      className="!text-[24px] !text-secondary-80 flex items-center justify-center !px-0 !pr-0 relative"
    >
      <IoMdNotificationsOutline />
      <div className="absolute right-1 top-0 bg-primary w-2 h-2 rounded-full mt-1" />
    </Button>
  </Popover>
);

export default NotificationPanel;
