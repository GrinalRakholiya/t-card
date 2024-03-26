import React from 'react';
import { liveCardChartdata as data, carDataChartOptions as options, widgetData } from './constant.tsx';
import CarStatusWidget from '../../components/carStatuswidget/index.tsx';
import VerticleBarChart from '../../components/charts/verticleBarChart.tsx';

const Dashboard: React.FC = () => (
  <div className="py-7 px-8">
    <div>
      <h3 className="text-[20px] text-secondary-80 font-semibold">Hello John Roe</h3>
    </div>
    <div className="grid grid-cols-3 gap-5 mt-5">
      <div className="col-span-2 border border-gray-10 p-6 rounded-lg">
        <VerticleBarChart data={data} options={options} />
      </div>
      <div className="space-y-5">
        {widgetData?.map((val, i) => (
          <CarStatusWidget
            key={i}
            icon={val.icon}
            bgColor={val.bgColor}
            color={val.color}
            count={val.count}
            growth={val.growth}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Dashboard;
