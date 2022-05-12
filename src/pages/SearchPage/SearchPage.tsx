import EntitySelector from '../../components/EntitySelector';
import Logo from '../../assets/images/logo.png';
import AutoComplete from '../../components/Search/AutoComplete/AutoComplete';
import ToggleSwitch from '../../components/Toggle/Toggle';
import SearchResults from '../../components/Search/SearchResults/SearchResults';

const SearchPage: React.FunctionComponent = () => {
  return (
    <div className="container pb-40">
      <img src={Logo} alt="star wars" className="home-image" />
      <div className="search-wrapper mb-40">
        <ToggleSwitch />
        <div className="d-flex">
          <EntitySelector />
          <AutoComplete />
        </div>
      </div>
      <SearchResults />
    </div>
  );
};

export default SearchPage;
