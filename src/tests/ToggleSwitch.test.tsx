import { render, screen, cleanup } from './testUtils';
import Toggle from '../components/Toggle/Toggle';

afterEach(cleanup);
describe('Toggle', () => {
  test('renders with text', () => {
    render(<Toggle />);
    const text = screen.getByText(/Switch to Wookie/i);
    expect(text).toBeInTheDocument();
  });
});
