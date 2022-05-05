import { render, screen, cleanup } from './testUtils';
import Login from '../pages/LoginPage/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);
describe('<Login />', () => {
  test('renders Login Form', () => {
    render(<Login />);
    const login = screen.getByText(/Login/i);
    const usernameElement = screen.getByPlaceholderText(/Luke Skywalker/i);
    const passwordElement = screen.getByPlaceholderText('********');
    const submit = screen.getByText('Submit');
    expect(login).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
});
