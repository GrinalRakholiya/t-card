import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from '../modal/index.tsx';
import { DataInterface } from './type.ts';

const VehicleViewModal: React.FC<DataInterface> = ({ viewData, isModalOpen, setIsModalOpen }) => {
  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal title="Vehicle view" width={660} footer={null} centered open={isModalOpen} onCancel={handleCancel}>
        <div className="relative w-full mt-4">
          <div className="space-y-2 max-w-[400px] w-full">
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">ID</h3>
              <h3>{viewData?.id}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Vehicle number</h3>
              <h3>{viewData?.vehicle_number}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Vehicle type</h3>
              <h3>{viewData?.vehicle_type}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Key tag</h3>
              <h3>{viewData?.key_tag}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Parked at</h3>
              <h3>{viewData?.parked_at}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Make</h3>
              <h3>{viewData?.make}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Manufactured date</h3>
              <h3>{viewData?.manufactured_date}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Model</h3>
              <h3>{viewData?.model}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Registration date</h3>
              <h3>{viewData?.registration_date}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Status</h3>
              <h3>{viewData?.status}</h3>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Driver side</h3>
              <div>
                <h3 className="text-secondary font-medium">
                  Data code: <span className="font-normal">{viewData?.drive_side.dataCode}</span>
                </h3>
                <h3 className="text-secondary font-medium">
                  Display text: <span className="font-normal">{viewData?.drive_side.displayText}</span>
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Registration letter</h3>
              <div>
                <h3 className="text-secondary font-medium">
                  Letters: <span className="font-normal">{viewData?.registration_letter.letters}</span>
                </h3>
                <h3 className="text-secondary font-medium">
                  Year: <span className="font-normal">{viewData?.registration_letter.year}</span>
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-secondary font-semibold">Created at</h3>
              <h3>{viewData?.created_at}</h3>
            </div>
          </div>
          <div className="absolute right-0 top-0 border border-secondary-20 p-2 rounded-md">
            {viewData?.qr_code && <QRCodeCanvas value={viewData.qr_code} size={170} />}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VehicleViewModal;
