import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { render, screen, cleanup } from './testUtils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock(
  '../components/CustomElements/CustomButton/CustomButton',
  () => () => <div data-testid="Button"></div>,
);

afterEach(cleanup);
describe('Not found page component', () => {
  test('should display correctly', () => {
    render(<NotFoundPage />);
    const text = screen.getByText(/404/i);
    const field = screen.getByTestId(/Button/i);
    expect(text).toBeInTheDocument();
    expect(field).toBeInTheDocument();
  });
});
