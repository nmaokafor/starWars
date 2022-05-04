import { useEffect, useState } from 'react';
import SearchIcon from '../Svgs/SearchIcon';
import { useSingleSearchQuery } from '../../hooks/queries/useSingleSearch';
import { useCustomContext } from '../../CustomContextProvider';
import SuggestionsList from '../SuggestionsList/SuggestionsList';

import styles from './SearchParent.module.scss';

const SearchParent = () => {
  const { entityDataToFetch } = useCustomContext();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data } = useSingleSearchQuery(searchValue);

  useEffect(() => {
    if (data && data?.arrayOfNames && data.searchResultsArray) {
      setSuggestions(data.arrayOfNames);
    }
    if (data && data?.arrayOfWookieNames) {
      setSuggestions(data.arrayOfWookieNames);
    }
  }, [data]);

  const handleClick = (e: { target: { innerText: any } }) => {
    setSearchValue(e.target.innerText);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setShowSuggestions(true);
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
};

export default SearchParent;
