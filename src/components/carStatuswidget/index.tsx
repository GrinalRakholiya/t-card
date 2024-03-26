import React, { ReactNode } from 'react';

interface WidgetData {
  icon: ReactNode;
  bgColor: string;
  count: number;
  growth: number;
  color: string;
}

const CarStatusWidget: React.FC<WidgetData> = ({ bgColor, icon, count, growth, color }) => (
  <div className="border flex items-center gap-5 border-gray-10 rounded-md p-5">
    <div className={`h-[55px] min-w-[55px] rounded-lg flex items-center justify-center ${bgColor}`}>{icon}</div>
    <div className="flex items-center justify-between w-full">
      <h3 className="text-gray-80 text-[22px] font-bold">
        {count} <span className="text-gray-60 text-sm font-semibold">New leads</span>
      </h3>
      <p className="text-sm font-medium text-gray-60 flex items-center gap-1">
        <span className={`${color} font-semibold`}>+ {growth}</span> this month
      </p>
    </div>
  </div>
);

export default CarStatusWidget;
