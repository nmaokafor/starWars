import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../Svgs/SearchIcon';
import { useSingleSearchQuery } from '../../hooks/queries/useSingleSearch';
import { useCustomContext } from '../../CustomContextProvider';

import styles from './SearchParent.module.scss';
const SearchParent = () => {
  const navigate = useNavigate();
  const { entityDataToFetch } = useCustomContext();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data } = useSingleSearchQuery(searchValue);

  useEffect(() => {
    if (data && data?.arrayOfNames && data.searchResultsArray) {
      setSuggestions(data.arrayOfNames);
    }
  }, [data]);

  const handleSearch = async (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
    setShowSuggestions(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    navigate(`${searchValue}`);
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
        <div className={styles.searchIcon} onClick={handleSubmit}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchParent;
