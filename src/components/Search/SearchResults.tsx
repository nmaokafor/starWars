import BarChart from '../../components/Chart/BarChart';
import { useCustomContext } from '../../CustomContextProvider';

const SearchResults: React.FunctionComponent = () => {
  const { entityDataToFetch } = useCustomContext();
  return (
    <div className="stars-background">
      <h2 className="text-h3 text-center my-16">
        Showing results for {entityDataToFetch}
      </h2>
      <div className="mx-auto mw-600">
        <div className="chart">
          <BarChart />
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
