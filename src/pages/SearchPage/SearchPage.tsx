import EntitySelector from '../../components/EntitySelector';
import Logo from '../../assets/images/logo.png';

const SearchPage = () => {
  return (
    <div className="container py-40">
      <img src={Logo} alt="star wars" className="home-image" />

      <div className="search-wrapper mb-40">
        <div className="d-flex">
          <EntitySelector />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
