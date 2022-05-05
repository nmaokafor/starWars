import { render, screen, cleanup } from './testUtils';
import SearchPage from '../pages/SearchPage/SearchPage';

jest.mock('../components/Toggle/Toggle', () => () => (
  <div data-testid="Toggle"></div>
));
jest.mock('../components/EntitySelector', () => () => (
  <div data-testid="EntitySelector"></div>
));
jest.mock('../components/Search/AutoComplete', () => () => (
  <div data-testid="AutoComplete"></div>
));
jest.mock('../components/Search/SearchResults', () => () => (
  <div data-testid="SearchResults"></div>
));

afterEach(cleanup);
describe('SearchPage', () => {
  test('renders correctly', () => {
    render(<SearchPage />);
    const Toggle = screen.getByTestId(/Toggle/i);
    const EntitySelector = screen.getByTestId(/EntitySelector/i);
    const AutoComplete = screen.getByTestId(/AutoComplete/i);
    const SearchResults = screen.getByTestId(/SearchResults/i);
    expect(Toggle).toBeInTheDocument();
    expect(EntitySelector).toBeInTheDocument();
    expect(AutoComplete).toBeInTheDocument();
    expect(SearchResults).toBeInTheDocument();
  });
});
