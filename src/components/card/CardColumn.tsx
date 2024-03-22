import React from 'react';
import CardComponent from './index.tsx';
import { CardDetailsInterface } from './type.ts';

type CardColumnProps = {
  title: string;
  data: CardDetailsInterface[];
};

const CardColumnComponent: React.FC<CardColumnProps> = ({ title, data }) => (
  <div className="border-r border-gray-10 min-w-[270px] w-full">
    <div className="mx-3 text-white font-semibold p-2 rounded-md text-sm text-center bg-secondary-40 mb-3">
      <h3>{title}</h3>
    </div>
    <div className="mb-1.5 h-[calc(100vh-276px)] overflow-y-auto px-2">
      {data?.map((data, index) => (
        <div key={index} className="w-full mb-2 rounded-[8px]">
          <CardComponent cardDetails={data} />
        </div>
      ))}
    </div>
  </div>
);

export default CardColumnComponent;
