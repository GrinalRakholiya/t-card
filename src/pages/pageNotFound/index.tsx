import React from 'react';
import { useNavigate } from 'react-router';

import Button from '../../components/button/index.tsx';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = (): void => {
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col gap-5 w-full items-center justify-center">
      <h1 className="text-primary-80 text-[62px] tracking-[6px] font-medium">404</h1>
      <div className="mt-0 max-w-[450px] text-center">
        <p className="text-secondary-60">
          The page you are looking for does not exists or you do not have access to it
          <Button
            onClick={goToHome}
            className="!px-0 !rounded-none !py-0 !border-0 !ml-1 !text-primary !border-b !border-primary !border-dashed"
          >
            {' '}
            Return to Home page
          </Button>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
