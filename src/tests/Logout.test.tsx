import { render, screen, cleanup } from './testUtils';
import Logout from '../components/Shared/Logout/Logout';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);
describe('<Logout />', () => {
  test('renders Logout button', () => {
    render(<Logout />);
    const logout = screen.getByText(/Logout/i);
    expect(logout).toBeInTheDocument();
  });
});
