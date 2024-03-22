import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Button from '../button/index.tsx';
import Modal from '../modal/index.tsx';

interface QrModalInterface {
  qr: string;
}

const ShowQrModal: React.FC<QrModalInterface> = ({ qr }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div>
      <Button
        className="!flex justify-center !border !border-secondary-20 rounded-sm p-1 !max-w-fit !w-full !mx-auto !px-1"
        onClick={() => setPreviewOpen(true)}
      >
        <QRCodeCanvas value={qr} size={50} />
      </Button>
      <Modal
        width={250}
        title="QR code"
        centered
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <div className="mt-5">
          <QRCodeCanvas value={qr} size={200} />
        </div>
      </Modal>
    </div>
  );
};

export default ShowQrModal;
