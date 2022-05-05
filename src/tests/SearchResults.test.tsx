import { render, screen, cleanup } from './testUtils';
import SearchResults from '../components/Search/SearchResults';

jest.mock('../components/Chart/BarChart', () => () => (
  <div data-testid="BarChart"></div>
));

afterEach(cleanup);
describe('SearchResults', () => {
  test('renders correctly', () => {
    render(<SearchResults />);
    const text = screen.getByText(/Showing results for People/i);
    const BarChart = screen.getByTestId(/BarChart/i);
    expect(text).toBeInTheDocument();
    expect(BarChart).toBeInTheDocument();
  });
});
