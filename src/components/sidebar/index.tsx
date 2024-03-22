import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { GoTasklist } from 'react-icons/go';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiUser3Line } from 'react-icons/ri';
import { PiUsersThree } from 'react-icons/pi';
import { AiOutlineQrcode } from 'react-icons/ai';
import { MdOutlineDirectionsCar } from 'react-icons/md';
import { BsBuildings } from 'react-icons/bs';
import { LiaSitemapSolid } from 'react-icons/lia';

import { route } from '../../routes/path.ts';
import { useSelector, AppState } from '../../redux/store.ts';
import { RolePermissions, DynamicRolePermissionType, DynamicSitePermissionType } from '../../utils/RolePermission.ts';

import './sidebarStyle.scss';

interface SidebarProps {
  collapsed: boolean;
}

const { Sider } = Layout;

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state: AppState) => state.auth.userData);

  const handleMenuItemClick = (path: string): void => {
    navigate(path);
  };

  const getMenuItems = (): typeof routes => {
    const routes = [
      // {
      //   key: route.HOME.path,
      //   icon: <GoHome />,
      //   label: 'Home',
      //   onClick: () => handleMenuItemClick(route.HOME.path),
      // },
      {
        key: route.DASHBOARD.path,
        icon: <LuLayoutDashboard />,
        label: 'Dashboard',
        onClick: () => handleMenuItemClick(route.DASHBOARD.path),
      },
      {
        key: route.LIVESTATUS.path,
        icon: <GoTasklist />,
        label: 'Live status',
        onClick: () => handleMenuItemClick(route.LIVESTATUS.path),
      },
      {
        key: route.ROLES.path,
        icon: <PiUsersThree />,
        label: 'Roles',
        onClick: () => handleMenuItemClick(route.ROLES.path),
      },
      {
        key: route.USERS.path,
        icon: <RiUser3Line />,
        label: 'Users',
        onClick: () => handleMenuItemClick(route.USERS.path),
      },
      {
        key: route.DEPARTMENT.path,
        icon: <BsBuildings />,
        label: 'Departments',
        onClick: () => handleMenuItemClick(route.DEPARTMENT.path),
      },
      {
        key: route.QRCODE.path,
        icon: <AiOutlineQrcode />,
        label: 'QR Code',
        onClick: () => handleMenuItemClick(route.QRCODE.path),
      },
      {
        key: route.SITES.path,
        icon: <LiaSitemapSolid />,
        label: 'Sites',
        onClick: () => handleMenuItemClick(route.SITES.path),
      },
      {
        key: route.VEHICLES.path,
        icon: <MdOutlineDirectionsCar />,
        label: 'Vehicles',
        onClick: () => handleMenuItemClick(route.VEHICLES.path),
      },
    ];

    const menuItems: typeof routes = [];
    routes.forEach((route: (typeof routes)[0]) => {
      // '/' route is a sample page. it will be removed in future. when it is remived remove this condition
      if (route.key === '/') {
        menuItems.push(route);
        return;
      }

      const path = route.key.split('/')[1];
      const routePermissions: string[] = RolePermissions[userData.role as keyof DynamicRolePermissionType]
        ? RolePermissions[userData.role as keyof DynamicRolePermissionType][path as keyof DynamicSitePermissionType]
        : [];
      if (routePermissions && routePermissions.length) {
        if (routePermissions?.includes('view')) {
          menuItems.push(route);
        }
      }
    });
    return menuItems;
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sidebar-main !bg-primary-20 border-r border-gray-10"
    >
      <div className="demo-logo-vertical h-10 rounded-md bg-primary-40 mx-5 my-5" />
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        className="!bg-white"
        items={getMenuItems()}
      />
    </Sider>
  );
};

export default Sidebar;
