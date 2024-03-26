import { io } from 'socket.io-client';
import { HOST_API } from '../config.ts';

const socket = io(HOST_API, {
  path: '/live-updates',
});

export { socket };
