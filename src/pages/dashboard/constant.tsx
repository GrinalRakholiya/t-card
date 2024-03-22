import { ChartOptions } from 'chart.js';
import { FaCircleUser } from 'react-icons/fa6';

export const widgetData = [
  {
    icon: <FaCircleUser className="text-[22px] text-primary" />,
    count: 63,
    growth: 2.6,
    bgColor: 'bg-primary-20',
    color: 'text-primary',
  },
  {
    icon: <FaCircleUser className="text-[22px] text-success" />,
    count: 25,
    growth: 5.5,
    bgColor: 'bg-success-20',
    color: 'text-success',
  },
  {
    icon: <FaCircleUser className="text-[22px] text-error" />,
    count: 49,
    growth: 0.7,
    bgColor: 'bg-error-20',
    color: 'text-error',
  },
  {
    icon: <FaCircleUser className="text-[22px] text-gray" />,
    count: 12,
    growth: 2.6,
    bgColor: 'bg-gray-20',
    color: 'text-gray',
  },
];

export const carDataChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Departments',
        color: '#ff5b22',
        font: {
          family: 'montserrat',
          size: 14,
          weight: 'bold',
        },
      },
      ticks: {
        font: {
          family: 'montserrat',
          size: 14,
          weight: 'normal',
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        font: {
          family: 'montserrat',
          size: 14,
        },
      },
      title: {
        text: 'Total cars',
        color: '#ff5b22',
        font: {
          family: 'montserrat',
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

export const liveCardChartdata = {
  labels: ['Mech Prep', 'Body + Paint', 'Valet', 'Priced, Photos, Online', 'On pitch'],
  datasets: [
    {
      label: 'live status',
      data: [30, 56, 45, 70, 75],
      backgroundColor: '#ff7b4e',
      barPercentage: 0.4,
      borderRadius: 8,
    },
  ],
};
