import { render, screen, cleanup } from './testUtils';
import EntitySelector from '../components/EntitySelector';

afterEach(cleanup);
describe('EntitySelector', () => {
  test('renders with text', () => {
    render(<EntitySelector />);
    const People = screen.getByText(/People/i);
    const Planets = screen.getByText(/Planets/i);
    const Species = screen.getByText(/Species/i);
    expect(People).toBeInTheDocument();
    expect(Planets).toBeInTheDocument();
    expect(Species).toBeInTheDocument();
  });
});
