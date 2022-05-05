import CustomInputFields from '../components/CustomElements/CustomInputFields';
import { render, screen, cleanup } from './testUtils';

const handleChange = jest.fn();

afterEach(cleanup);
describe('Custom Input field component', () => {
  const Props = {
    fieldType: 'text',
    name: 'username',
    value: 'My name',
    handleChange: handleChange,
    placeholder: 'Luke Skywalker',
  };
  test('should display correctly', () => {
    render(<CustomInputFields {...Props} />);
    const field = screen.getByDisplayValue(/My name/i);
    expect(field).toBeInTheDocument();
  });
});
