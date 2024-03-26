import { useEffect, useState } from 'react';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import async from 'async';

import { useSelector, AppState } from '../redux/store.ts';
import { setError } from '../redux/slices/qrcodeSlice.ts';
import { getQRCodeAction } from '../redux/actions/qrcodeActions.ts';
import useNotification from './useNotification.ts';
import { QrcodeDataInterface } from '../pages/QRCode/type.ts';

type PropType = {
  qrCodeData: QrcodeDataInterface;
  noOfQRcodes: number;
  qrCodesPerPage: number;
  isLoading: boolean;
  showQRCode: boolean;
  isQRCodeLoading: boolean;
  contextHolder: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  generateQRCodes: () => void;
  generatePDF: () => Promise<void>;
  handleSelectChange: (value: number) => void;
  handleQRPerPageChange: (value: number) => void;
  handleModalClose: () => void;
};

interface GridItemSize {
  gridItemWidth: number;
  gridItemHeight: number;
}

const useQRCode = (): PropType => {
  const { data: qrCodeData, error, isLoading } = useSelector((state: AppState) => state.qrcode);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const [showQRCode, setShowQRCode] = useState(false);
  const [noOfQRcodes, setNoOfQRcodes] = useState(10);
  const [qrCodesPerPage, setQrCodesPerPage] = useState(9);
  const [isQRCodeLoading, setIsQRCodeLoaing] = useState<boolean>(false);

  const handleCloseNotification = (): void => {
    setError(null);
  };

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

  const generateQRCodes: () => void = () => {
    getQRCodeAction(noOfQRcodes);
    setShowQRCode(true);
  };

  const calculateGridItemSize = (pageWidth: number, pageHeight: number, gap: number): GridItemSize => {
    // Calculate number of columns and rows
    const numColumns = Math.ceil(Math.sqrt(qrCodesPerPage));
    const numRows = Math.ceil(qrCodesPerPage / numColumns);

    // Calculate available space for grid items considering the gaps
    const availableWidth = pageWidth - (numColumns + 1) * gap;
    const availableHeight = pageHeight - (numRows + 1) * gap;

    // Calculate size of a single grid item
    const gridItemWidth = availableWidth / numColumns;
    const gridItemHeight = availableHeight / numRows;

    return { gridItemWidth, gridItemHeight };
  };

  const generatePDF = async (): Promise<void> => {
    setIsQRCodeLoaing(true);
    // Create a new jsPDF instance
    const pdf = new JsPDF({
      orientation: 'p',
      unit: 'px',
      format: qrCodesPerPage === 9 ? 'a4' : 'a2',
    });
    const gap = 20;

    // Get the page size
    const { pageSize } = pdf.internal;
    const { gridItemWidth, gridItemHeight } = calculateGridItemSize(pageSize.width, pageSize.height, gap);

    // Set initial coordinates
    let y = gap;
    let x = gap;

    await async.eachSeries(qrCodeData, async (qrcode: QrcodeDataInterface) => {
      const quality = 1; // Higher the better but larger file
      const element = document.getElementById(qrcode.qr_id);

      const canvas = await html2canvas(element as HTMLElement, { scale: quality });
      const imageData = canvas.toDataURL('image/png');
      if (x + gridItemWidth >= pageSize.width) {
        y += gridItemHeight + gap; // Add some spacing between elements

        if (y + gridItemHeight >= pageSize.height) {
          // If the element doesn't fit, create a new page
          pdf.addPage();
          y = gap; // Reset y-coordinate for the new page
          x = gap; // Reset x-coordinate for the new page
        } else {
          x = gap; // Reset x-coordinate for the new page
        }
      }
      pdf.addImage(imageData, 'PNG', x, y, gridItemWidth, gridItemHeight);
      x += gridItemWidth + gap; // Add some spacing between elements
    });

    // Save or open the generated PDF
    pdf.save('QRCodes.pdf');
    setIsQRCodeLoaing(false);
  };

  const handleSelectChange = (value: number): void => {
    setNoOfQRcodes(value);
  };

  const handleQRPerPageChange = (value: number): void => {
    setQrCodesPerPage(value);
  };

  const handleModalClose = (): void => {
    setShowQRCode(false);
  };

  return {
    qrCodeData,
    noOfQRcodes,
    showQRCode,
    qrCodesPerPage,
    handleQRPerPageChange,
    isQRCodeLoading,
    isLoading,
    contextHolder,
    generateQRCodes,
    generatePDF,
    handleSelectChange,
    handleModalClose,
  };
};

export default useQRCode;
