import { useEffect, useState } from 'react';
import { Dictionary, groupBy } from 'lodash';

import { useSelector, AppState } from '../redux/store.ts';
import { setError } from '../redux/slices/liveStatusSlice.ts';
// import { socket } from '../services/socketService.ts';
import useNotification from './useNotification.ts';
import { DepartmentInterface } from '../pages/department/types.ts';
import { CardDetailsInterface } from '../components/card/type.ts';

type PropType = {
  cardData: Dictionary<CardDetailsInterface[]>;
  isLoading: boolean;
  contextHolder: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  deparmentToTitleMap: Record<string, string>;
};

const useLiveStatus = (): PropType => {
  const [cardData, setCardData] = useState<Dictionary<CardDetailsInterface[]>>({});
  const [departmentData, setDepartmentData] = useState<DepartmentInterface[] | undefined>();
  const data = useSelector((state: AppState) => state.liveStatus.data);
  const awaitingData = useSelector((state: AppState) => state.liveStatus.awaitingData);
  const isLoading = useSelector((state: AppState) => state.liveStatus.isLoading);
  const { department } = useSelector((state: AppState) => state.department);
  const error = useSelector((state: AppState) => state.liveStatus.error);
  const { openNotificationWithIcon, contextHolder } = useNotification();

  const handleCloseNotification = (): void => {
    setError(null);
  };

  useEffect(() => {
    setDepartmentData(department);
  }, [department]);

  // Enable this ode once the socket is implemented in server
  // Socket connection
  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('Connected to WebSocket server');
    // });
    // socket.on('card-update', (data: LiveStatusDataType[]) => {
    //   console.log('Received data:=-----', data);
    //   dispatch(setLiveStatusData(dummyCardData.data.rows));
    // });
    // // Send a message to the WebSocket server
    // socket.emit('message', 'Hello, WebSocket server!');
    // // Clean up the event listener when the component unmounts
    // return () => {
    //   socket.off('message');
    //   // socket.off('status');
    // };
    // dispatch(setLiveStatusData(data));
  }, []);

  useEffect(() => {
    const finalAwaitingData = groupBy(awaitingData, 'status');
    const finalData = groupBy(data, 'department_id');
    const newData = { ...finalData, ...finalAwaitingData };
    setCardData(newData);
  }, [data, awaitingData]);

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

  const deparmentToTitleMap: Record<string, string> = {};
  deparmentToTitleMap['PENDING-APPROVAL'] = 'Awaiting job card';
  if (departmentData) {
    const sortedDepartmentData = [...departmentData]; // Create a copy of departmentData
    sortedDepartmentData.sort((a, b) => a.sequence - b.sequence); // Sorting by sequence
    // Print the sequence of deparmentToTitleMap

    sortedDepartmentData.forEach((department) => {
      deparmentToTitleMap[department.department_id] = `${department.department}`;
      console.log(department.department_id);
      console.log(department.department);
      console.log(deparmentToTitleMap);
    });
  }
  deparmentToTitleMap['ON-PITCH'] = 'on pitch';

  return {
    cardData,
    isLoading,
    contextHolder,
    deparmentToTitleMap,
  };
};

export default useLiveStatus;
