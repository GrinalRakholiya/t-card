import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Layout } from 'antd';
import Sidebar from '../../components/sidebar/index.tsx';
import TopHeader from '../../components/header/index.tsx';
import { route } from '../../routes/path.ts';

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const location = useLocation();

  const routesArray = Object.values(route);

  useEffect(() => {
    const curTitle = routesArray.find((item) => item.path === location.pathname);
    if (curTitle && curTitle.title) {
      setTitle(curTitle.title);
    }
  }, [location.pathname, routesArray]);

  return (
    <Layout className="h-screen" style={{ background: 'white' }}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{ background: 'white' }}>
        <TopHeader title={title} collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="overflow-y-auto !bg-white">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
