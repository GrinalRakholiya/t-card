import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import Routes from './routes/index.tsx';
import './App.scss';
import useAuth from './hooks/useAuth.ts';

const App: React.FC = () => {
  useAuth();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorSuccess: '#0bd71f',
          colorError: '#f54040',
          colorTextBase: '#16161e',
          wireframe: false,
          colorPrimary: '#ff5b22',
          colorInfo: '#ff5b22',
          fontFamily: 'Montserrat',
        },
        components: {
          Table: {
            headerBorderRadius: 8,
            cellPaddingBlock: 14,
            headerBg: '#ffad90',
            borderColor: '#ff8c64',
            headerColor: '#1c3335',
            headerSplitColor: 'transparent',
            rowExpandedBg: '#677778',
            colorText: '#818e8f',
            fontWeightStrong: 600,
          },
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <Routes />
      </StyleProvider>
    </ConfigProvider>
  );
};

export default App;
