import React from 'react';
import { Modal, Typography } from 'antd';
import QRCode from 'qrcode.react';

import { QrcodeDataInterface } from './type.ts';
import Button from '../../components/button/index.tsx';
import Loader from '../../components/loader/index.tsx';
import Select from '../../components/select/index.tsx';
import useQRCode from '../../hooks/useQRCode.ts';
import './style.scss';

const QRCodePage: React.FC = () => {
  const {
    qrCodeData,
    noOfQRcodes,
    qrCodesPerPage,
    showQRCode,
    isQRCodeLoading,
    isLoading,
    contextHolder,
    generateQRCodes,
    generatePDF,
    handleSelectChange,
    handleQRPerPageChange,
    handleModalClose,
  } = useQRCode();

  return (
    <>
      {contextHolder}
      {(isLoading || isQRCodeLoading) && <Loader />}
      <div className="flex items-center justify-between m-5">
        <div className="flex gap-5 items-center w-max">
          <Typography className="w-fit whitespace-nowrap">Number of QR Codes to generate:</Typography>
          <Select
            defaultValue={noOfQRcodes}
            onChange={handleSelectChange}
            style={{ width: 120 }}
            options={[
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
            ]}
          />
        </div>
        <Button onClick={generateQRCodes}>Generate QR codes</Button>
      </div>
      <Modal
        title="QR Modal"
        open={showQRCode && !isLoading}
        okText="Download"
        onOk={generatePDF}
        centered
        width={qrCodesPerPage === 9 ? 576 : 850}
        onCancel={handleModalClose}
        className="qr-modal"
        footer={[
          <div className="flex gap-5 items-center w-max" key="qr-per-page">
            <Typography className="w-fit whitespace-nowrap">QR code per page:</Typography>
            <Select
              defaultValue={qrCodesPerPage}
              onChange={handleQRPerPageChange}
              style={{ width: 64 }}
              options={[
                { value: 9, label: '9' },
                { value: 16, label: '16' },
                { value: 25, label: '25' },
              ]}
            />
          </div>,
          <div className="flex gap-2" key="modal-buttons">
            <Button key="back" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button key="submit" type="primary" loading={isLoading} onClick={generatePDF}>
              Download
            </Button>
          </div>,
        ]}
      >
        <div
          id="qrcode-cotainer"
          className={`grid gap-2 my-5`}
          style={{ gridTemplateColumns: `repeat(${Math.sqrt(qrCodesPerPage)}, 1fr)` }}
        >
          {qrCodeData &&
            Array.isArray(qrCodeData) &&
            qrCodeData.map((qrcode: QrcodeDataInterface) => (
              <div
                key={qrcode.qr_id}
                id={qrcode.qr_id}
                className="border border-solid rounded border-slate-300 py-5 text-center"
              >
                <p className="2xl:mb-6 mb-4 font-bold">{qrcode.qr_id}</p>
                <QRCode value={qrcode.qr_id} className="m-auto" />
              </div>
            ))}
        </div>
      </Modal>
    </>
  );
};

export default QRCodePage;
