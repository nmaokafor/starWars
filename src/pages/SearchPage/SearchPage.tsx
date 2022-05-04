import EntitySelector from '../../components/EntitySelector';
import Logo from '../../assets/images/logo.png';
import SearchParent from '../../components/Search/SearchParent';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const SearchPage = () => {
  return (
    <div className="container py-40">
      <img src={Logo} alt="star wars" className="home-image" />
      <div className="search-wrapper mb-40">
        <ToggleSwitch />
        <div className="search-wrapper mb-40">
          <div className="d-flex">
            <EntitySelector />
            <SearchParent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
