import React, { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import SearchIcon from '../Svgs/SearchIcon';
import { useSingleSearchQuery } from '../../hooks/queries/useSingleSearch';
import { useCustomContext } from '../../CustomContextProvider';
import SuggestionsList from '../SuggestionsList/SuggestionsList';

import styles from './AutoComplete.module.scss';
import { extractBarChartData } from '../../helpers/utils';

const AutoComplete: FunctionComponent = React.memo(() => {
  const { entityDataToFetch, fetchWithWookiee, setBarChartData } =
    useCustomContext();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data } = useSingleSearchQuery(searchValue);

  useEffect(() => {
    if (
      (data && data?.arrayOfNames && data.searchResultsArray) ||
      (data && data?.arrayOfWookieNames)
    ) {
      setSuggestions(data.arrayOfNames || data.arrayOfWookieNames);

      const extractedBarChartData = extractBarChartData(
        data.searchResultsArray,
        entityDataToFetch,
        fetchWithWookiee,
      );

      setBarChartData(extractedBarChartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClick = (e: { target: { innerText: any } }) => {
    setSearchValue(e.target.innerText);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setBarChartData({});
    }
    setSearchValue(value);
    setShowSuggestions(true);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(false);
  };

  return (
    <div className={`${styles.autocomplete}`}>
      <div className={styles.search}>
        <input
          className="text-field block"
          placeholder={`search for ${entityDataToFetch.toLowerCase()}`}
          type="search"
          onChange={handleSearch}
          value={searchValue}
          onBlur={handleBlur}
        />
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
      </div>
      {showSuggestions && searchValue && (
        <SuggestionsList
          filteredSuggestions={suggestions}
          activeSuggestionIndex={0}
          onClick={handleClick}
        />
      )}
    </div>
  );
});

export default AutoComplete;
