import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/index.tsx';

import useLiveStatus from '../../hooks/useLiveStatus.ts';
import CardView from './cardView.tsx';
import Modal from '../../components/modal/index.tsx';
import { getLiveStatusAction, getLiveVehicleAction } from '../../redux/actions/liveStatusCardActions.ts';
import { getDepartmentAction } from '../../redux/actions/departmentAction.ts';
import './style.scss';
import { getSitesAction } from '../../redux/actions/sitesAction.ts';

const AvailableCards: React.FC = () => {
  const { isLoading, contextHolder } = useLiveStatus();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getLiveStatusAction();
    getLiveVehicleAction();
    getDepartmentAction();
    getSitesAction();
  }, []);

  return (
    <div className="w-full">
      {contextHolder}
      {isLoading && <Loader />}
      <CardView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Modal className="card-full-view" width="100vw" footer={null} centered open={isModalOpen} onCancel={handleCancel}>
        <div>
          <CardView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </div>
  );
};

export default AvailableCards;
