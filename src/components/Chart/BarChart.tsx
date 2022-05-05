import { FunctionComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useCustomContext } from '../../CustomContextProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart: FunctionComponent = () => {
  const { barChartData } = useCustomContext();

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Results',
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {barChartData.labels?.length > 0 ? (
        <Bar options={options} data={barChartData} />
      ) : (
        <h3 className="text-body text-center my-40 primary--text">
          Chart will show here..
        </h3>
      )}
    </div>
  );
};

export default BarChart;
