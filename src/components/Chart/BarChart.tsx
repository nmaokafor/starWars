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

interface Props {
  loading: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart: FunctionComponent<Props> = ({ loading }) => {
  const { barChartData, entityDataToFetch, resultsQueryValue } =
    useCustomContext();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Results',
      },
    },
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '50vh',
        textAlign: 'center',
      }}
    >
      {loading && <p className="loader" />}

      {!loading && resultsQueryValue.length === 0 && (
        <h3 className="text-body text-center my-40 primary--text">
          Results for {entityDataToFetch} will show here..
        </h3>
      )}

      {!loading &&
        resultsQueryValue.length > 0 &&
        barChartData.labels?.length > 0 && (
          <>
            Search value: {resultsQueryValue}
            <Bar options={options} data={barChartData} />
          </>
        )}

      {!loading &&
        resultsQueryValue.length > 0 &&
        barChartData.labels?.length === 0 && (
          <div>No data found for {resultsQueryValue} </div>
        )}
    </div>
  );
};

export default BarChart;
