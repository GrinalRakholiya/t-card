import {
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../styles/variables.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
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
        display: true,
      },
      grid: {
        display: true,
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
        display: true,
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

const labels = ['Mech Prep', 'Body + Paint', 'Valet', 'Priced, Photos, Online', 'On pitch'];

export const data = {
  labels,
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

interface HorizontalBarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  width?: number;
  height?: number;
  redraw?: boolean;
}

const VerticleBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  options = {},
  width = 400,
  height = 200,
  ...props
}) => {
  options = {
    ...options,
    responsive: options?.responsive ?? true,
  };
  options.scales = {
    ...options.scales,
    x: {
      ...options.scales?.x,
      title: {
        display: true,
        ...options.scales?.x?.title,
      },
    },
    y: {
      ...options.scales?.y,
      title: {
        display: true,
        ...options.scales?.y?.title,
      },
    },
  };
  // by default alignment of chart title is center, as per our chart component usage, keeping alignment default as left
  options.plugins = {
    ...options?.plugins,
    legend: {
      display: false, // default legend to false as most of the chart don't legends
      ...options?.plugins?.legend,
    },
    title: {
      align: 'start',
      ...options?.plugins?.title,
      display: options?.plugins?.title?.display ?? !!options?.plugins?.title?.text,
    },
  };

  return <Bar data={data} options={options} width={width} height={height} {...props} />;
};

export default VerticleBarChart;
