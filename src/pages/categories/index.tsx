import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/index.tsx';
import Loader from '../../components/loader/index.tsx';
import { getCategoriesAction } from '../../redux/actions/categoriesActions.ts';
import { setError } from '../../redux/slices/categoriesSlice.ts';
import { useSelector, AppState } from '../../redux/store.ts';
import useNotification from '../../hooks/useNotification.ts';

const Categories: React.FC = () => {
  const { categories, error, isLoading } = useSelector((state: AppState) => state.categories);
  const navigate = useNavigate();
  const { openNotificationWithIcon, contextHolder } = useNotification();

  const handleCloseNotification = (): void => {
    setError(null);
  };

  useEffect(() => {
    getCategoriesAction();
  }, []);

  useEffect(() => {
    if (error) {
      openNotificationWithIcon({
        type: 'error',
        message: error.message,
        description: '',
        onClose: handleCloseNotification,
      });
    }
  }, [error, openNotificationWithIcon]);

  const handleDashboardClick: () => void = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col gap-5 m-5 items-center justify-center">
      {contextHolder}
      {isLoading && <Loader />}
      <h2>Digital T-card admin panel</h2>
      <Button onClick={handleDashboardClick}>Go to Dashboard</Button>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: string[], index: number) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
