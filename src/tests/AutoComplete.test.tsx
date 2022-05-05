import { render, screen, cleanup } from './testUtils';
import AutoComplete from '../components/Search/AutoComplete';

jest.mock('../components/Svgs/SearchIcon', () => () => (
  <div data-testid="SearchIcon"></div>
));

afterEach(cleanup);
describe('AutoComplete', () => {
  test('renders with text', () => {
    render(<AutoComplete />);
    const SearchField = screen.getByPlaceholderText(/search for people/i);
    const SearchIcon = screen.getByTestId(/SearchIcon/i);
    expect(SearchField).toBeInTheDocument();
    expect(SearchIcon).toBeInTheDocument();
  });
});
