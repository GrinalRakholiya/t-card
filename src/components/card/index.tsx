import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { FaKey } from 'react-icons/fa';
import { calculateTime } from 'digital-tcard-utils';
import type { TimeParams } from 'digital-tcard-utils';
import './cardStyle.scss';
import CardApproveModal from '../cardApproveModal/index.tsx';
import { CardComponentProps } from './type.ts';
import { AppState, useSelector } from '../../redux/store.ts';
import { SitesInterface } from '../../pages/sites/type.ts';
import VehicleViewModal from '../vehicleViewModal/index.tsx'; // Update the path accordingly

const CardComponent: React.FC<CardComponentProps> = ({ cardDetails }) => {
  const sites = useSelector((state: AppState) => state.sites.sites);
  const [color, setColor] = useState<string>('');
  const [cardData, setCardData] = useState<CardComponentProps | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<string>(''); // State for both modals
  const [totalTime, setTotalTime] = useState<string>('');
  const [departmentTotalTime, setDepartmentTotalTime] = useState<string>('');

  const handleApprove = (cardDetails: CardComponentProps): void => {
    setIsModalOpen('approve');
    setCardData(cardDetails);
  };

  const handleCardClick = (e): void => {
    e.stopPropagation(); // Prevent propagation to the parent elements
    setIsModalOpen('view'); // Open the modal
  };

  useEffect(() => {
    if (cardDetails.status === 'IN-PROGRESS') {
      setColor('!bg-[#FFF9C0]');
    } else if (['COMPLETED', 'ON-PITCH'].includes(cardDetails.status)) {
      setColor('!bg-[#D2FFC2]');
    } else {
      setColor('!bg-[#FFD4D4]');
    }
  }, [cardDetails]);

  useEffect(() => {
    const vehicleSite = sites.find((site: SitesInterface) => site.site_id === cardDetails.assigned_site);

    const startTime = cardDetails.department_waiting_time
      ? moment(cardDetails.department_waiting_time)
      : moment(cardDetails.current_department_time);

    const calculate_start_time = cardDetails.status === 'ON-PITCH' ? cardDetails.created_at : startTime;
    const calculate_end_time = cardDetails.status === 'ON-PITCH' ? cardDetails.updated_at : moment();

    // Calculate department time
    const params: TimeParams = {
      start_time: calculate_start_time,
      working_start_time: vehicleSite?.working_start_time || '09:00',
      working_end_time: vehicleSite?.working_end_time || '17:00',
      working_days: vehicleSite?.working_days || 5,
    };
    const currentTime = calculate_end_time;
    const totalDepartmentTime = calculateTime(currentTime, params);
    setDepartmentTotalTime(totalDepartmentTime);

    // Calculate total time
    const totalTimeParams: TimeParams = {
      start_time: cardDetails.created_at,
      working_start_time: vehicleSite?.working_start_time || '09:00',
      working_end_time: vehicleSite?.working_end_time || '17:00',
      working_days: vehicleSite?.working_days || 5,
    };

    const totalProcessingTime = calculateTime(currentTime, totalTimeParams);
    setTotalTime(totalProcessingTime);
  }, [sites, cardDetails]);

  return (
    <>
      <Card
        className={`!p-0 ${color} ${cardDetails.status === 'PENDING-APPROVAL' && 'cursor-pointer'}`}
        onClick={() => (cardDetails.status === 'PENDING-APPROVAL' ? handleApprove({ cardDetails }) : undefined)}
      >
        <div className="card-body space-y-[2px]">
          <div className="flex items-center justify-between">
            <button type="button" className="font-bold" onClick={(e) => handleCardClick(e)}>
              {cardDetails.vehicle_number}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Key Tag:</h3>
            <p className="border border-black px-2 rounded-full text-xs font-bold flex items-center gap-1">
              <FaKey />
              {cardDetails.key_tag}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Parking Location:</h3>
            <p className="font-medium text-gray-60 capitalize">{cardDetails?.parked_at?.toLowerCase()}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <h3 className="font-semibold capitalize">Status: </h3>
            <p className="text-end font-medium text-gray-60 capitalize">{cardDetails?.status?.toLowerCase()}</p>
          </div>
          {cardDetails.department_waiting_time && (
            <div className="flex items-center justify-between flex-wrap">
              <h3 className="font-semibold capitalize">{`${
                cardDetails.department_waiting_time ? 'waiting' : 'processing'
              } time:`}</h3>
              <p className="text-end font-medium text-gray-60">{departmentTotalTime}</p>
            </div>
          )}
          {(cardDetails.total_time || cardDetails.status === 'ON-PITCH') && (
            <div className="flex items-center justify-between flex-wrap">
              <h3 className="font-semibold capitalize">total time:</h3>
              <p className="text-end font-medium text-gray-60">{totalTime}</p>
            </div>
          )}
        </div>
      </Card>

      <VehicleViewModal isModalOpen={isModalOpen === 'view'} setIsModalOpen={setIsModalOpen} viewData={cardDetails} />
      <CardApproveModal isModalOpen={isModalOpen === 'approve'} setIsModalOpen={setIsModalOpen} cardData={cardData} />
    </>
  );
};

export default CardComponent;
