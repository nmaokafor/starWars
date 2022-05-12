import React, { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import SearchIcon from '../../Svgs/SearchIcon';
import { useSingleSearchQuery } from '../../../hooks/queries/useSingleSearch';
import { useCustomContext } from '../../../CustomContextProvider';
import SuggestionsList from '../../SuggestionsList/SuggestionsList';

import styles from './AutoComplete.module.scss';
import { convertArrayOfDataToArrayOfNames } from '../../../helpers/utils';

const AutoComplete: FunctionComponent = React.memo(() => {
  const {
    entityDataToFetch,
    fetchWithWookiee,
    setBarChartData,
    setResultsQueryValue,
    setSubmitButtonClicked,
  } = useCustomContext();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data } = useSingleSearchQuery(searchValue);

  useEffect(() => {
    if (data?.length > 0 && searchValue) {
      const arrayOfNames = convertArrayOfDataToArrayOfNames(
        data,
        fetchWithWookiee,
      );

      setSuggestions(arrayOfNames);
    } else {
      setSuggestions([]);
      setBarChartData({
        labels: [],
        datasets: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchValue]);

  const handleMouseDown = (e: { target: { innerText: any } }) => {
    setSearchValue(e.target.innerText);
    setResultsQueryValue(e.target.innerText);
    setSubmitButtonClicked(true);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    setResultsQueryValue(searchValue);
    setSubmitButtonClicked(true);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSubmitButtonClicked(false);
    setShowSuggestions(true);
    setResultsQueryValue('');
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      setResultsQueryValue(searchValue);
      setSubmitButtonClicked(true);
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`${styles.autocomplete}`}>
      <div className={styles.search}>
        <input
          className="text-field block"
          placeholder={`search for ${entityDataToFetch.toLowerCase()}`}
          type="search"
          onKeyDown={handleKeyDown}
          onChange={handleSearch}
          value={searchValue}
          onBlur={handleBlur}
        />
        <div className={styles.searchIcon} onClick={handleSubmit}>
          <SearchIcon />
        </div>
      </div>
      {showSuggestions && searchValue && (
        <SuggestionsList
          filteredSuggestions={suggestions}
          activeSuggestionIndex={0}
          handleMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
});

export default AutoComplete;
