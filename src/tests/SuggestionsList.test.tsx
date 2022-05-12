import { render, screen, cleanup } from './testUtils';
import SuggestionsList from '../components/SuggestionsList/SuggestionsList';

const handleMouseDown = jest.fn();

afterEach(cleanup);
describe('SuggestionsList', () => {
  test('renders with no suggestions', () => {
    const Props = {
      filteredSuggestions: [],
      activeSuggestionIndex: 1,
      handleMouseDown: handleMouseDown,
    };
    render(<SuggestionsList {...Props} />);
    const text = screen.getByText(/No suggestions found/i);
    expect(text).toBeInTheDocument();
  });

  test('renders with suggestions', () => {
    const Props = {
      filteredSuggestions: ['Nma'],
      activeSuggestionIndex: 1,
      handleMouseDown: handleMouseDown,
    };
    render(<SuggestionsList {...Props} />);
    const text = screen.getByText(/Nma/i);
    expect(text).toBeInTheDocument();
  });
});
