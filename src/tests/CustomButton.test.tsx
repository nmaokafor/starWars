import Button from '../components/CustomElements/CustomButton/CustomButton';
import { render, screen, cleanup } from './testUtils';

jest.mock('../components/Spinner/Spinner', () => () => (
  <div data-testid="Spinner"></div>
));

const onClick = jest.fn();

afterEach(cleanup);
describe('Button component', () => {
  test('should display text when loading is false', () => {
    const Props = {
      loading: false,
      disabled: false,
      children: 'Submit',
      onClick: onClick,
    };

    render(<Button {...Props} />);
    const field = screen.getByText(/Submit/i);
    expect(field).toBeInTheDocument();
  });

  test('should display spinner when loading is true', () => {
    const Props = {
      loading: true,
      disabled: false,
      children: 'Submit',
      onClick: onClick,
    };

    render(<Button {...Props} />);
    const field = screen.getByTestId(/Spinner/i);
    expect(field).toBeInTheDocument();
  });
});
