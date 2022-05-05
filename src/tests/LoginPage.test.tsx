import { render, screen, cleanup } from './testUtils';
import LoginParent from '../pages/LoginPage/LoginPage';

jest.mock('../pages/LoginPage/Login', () => () => (
  <div data-testid="Login"></div>
));

afterEach(cleanup);
describe('LoginParent', () => {
  test('Login page should be in document', () => {
    render(<LoginParent />);
    const login = screen.getByTestId(/Login/i);
    expect(login).toBeInTheDocument();
  });
});
