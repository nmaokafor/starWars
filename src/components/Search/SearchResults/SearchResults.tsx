import { useEffect, useState } from 'react';
import BarChart from '../../Chart/BarChart';
import { useCustomContext } from '../../../CustomContextProvider';
import { extractBarChartData } from '../../../helpers/utils';
import { useResultsQuery } from '../../../hooks/queries/useResultsQuery';

import styles from './SearchResults.module.scss';

const SearchResults: React.FunctionComponent = () => {
  const {
    setBarChartData,
    entityDataToFetch,
    fetchWithWookiee,
    resultsQueryValue,
    submitButtonClicked,
    searchResults,
  } = useCustomContext();
  const [page, setPage] = useState(1);
  const [nextButton, setNextButton] = useState(false);
  const [previousButton, setPreviousButton] = useState(false);

  const { isLoading, refetch } = useResultsQuery(resultsQueryValue, page);

  useEffect(() => {
    if (resultsQueryValue.length > 0 && submitButtonClicked) {
      refetch();
      setPage(1);
    }
    setNextButton(false);
    setPreviousButton(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsQueryValue, fetchWithWookiee, submitButtonClicked]);

  useEffect(() => {
    if (searchResults?.results && !fetchWithWookiee) {
      searchResults?.next ? setNextButton(true) : setNextButton(false);
      searchResults?.previous
        ? setPreviousButton(true)
        : setPreviousButton(false);
      const extractedBarChartData = extractBarChartData(
        searchResults?.results,
        entityDataToFetch,
        fetchWithWookiee,
      );

      setBarChartData(extractedBarChartData);
    } else if (searchResults?.rcwochuanaoc && fetchWithWookiee) {
      setNextButton(false);
      setPreviousButton(false);

      const extractedBarChartData = extractBarChartData(
        searchResults?.rcwochuanaoc,
        entityDataToFetch,
        fetchWithWookiee,
      );

      setBarChartData(extractedBarChartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults, fetchWithWookiee]);

  const handlePreviousClick = (e: any) => {
    e.preventDefault();
    setPage(page - 1);
    return;
  };

  const handleNextClick = (e: any) => {
    e.preventDefault();
    setPage(page + 1);
    return;
  };

  return (
    <div className="stars-background display-contents">
      <div className="mx-auto mw-600 mb-40">
        <div className="chart" style={{ marginBottom: '16px' }}>
          <BarChart loading={isLoading} />
        </div>
        <div className={`py-24 ${styles.navigationButtons}`}>
          {previousButton && (
            <p className={styles.previousButton} onClick={handlePreviousClick}>
              Previous
            </p>
          )}
          {nextButton && (
            <p className={styles.nextButton} onClick={handleNextClick}>
              Next
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
