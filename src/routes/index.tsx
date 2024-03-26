import { useRoutes, RouteObject } from 'react-router-dom';

// import Categories from '../pages/categories/index.tsx';
import Dashboard from '../pages/dashboard/index.tsx';
import DashboardLayout from '../layout/dashboard/index.tsx';
import AvailableCards from '../pages/availableCards/index.tsx';
import QRCodePage from '../pages/QRCode/index.tsx';
import { route } from './path.ts';
import Login from '../pages/login/index.tsx';
import Roles from '../pages/roles/index.tsx';
import Users from '../pages/users/index.tsx';
import Department from '../pages/department/index.tsx';
import Sites from '../pages/sites/index.tsx';
import PageNotFound from '../pages/pageNotFound/index.tsx';
import Vehicle from '../pages/vehicle/index.tsx';
import { AuthGuard } from '../guards/AuthGuard.tsx';
import { GuestGuard } from '../guards/GuestGuard.tsx';
import { RoleBasedGuard } from '../guards/RoleBasedGuard.tsx';

type RoutesType = () => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | null;

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      // {
      //   path: route.HOME.path,
      //   element: (
      //     <RoleBasedGuard>
      //       <Categories />
      //     </RoleBasedGuard>
      //   ),
      //   index: true,
      // },
      {
        path: route.DASHBOARD.path,
        element: (
          <RoleBasedGuard>
            <Dashboard />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.LIVESTATUS.path,
        element: (
          <RoleBasedGuard>
            <AvailableCards />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.ROLES.path,
        element: (
          <RoleBasedGuard>
            <Roles />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.QRCODE.path,
        element: (
          <RoleBasedGuard>
            <QRCodePage />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.USERS.path,
        element: (
          <RoleBasedGuard>
            <Users />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.DEPARTMENT.path,
        element: (
          <RoleBasedGuard>
            <Department />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.SITES.path,
        element: (
          <RoleBasedGuard>
            <Sites />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.VEHICLES.path,
        element: <Vehicle />,
      },
    ],
  },
  {
    path: route.LOGIN.path,
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: route.PAGENOTFOUND.path,
    element: <PageNotFound />,
  },
];

const Routes: RoutesType = () => useRoutes(routes);

export default Routes;
