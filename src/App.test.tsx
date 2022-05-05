import React from 'react';
import { render, screen } from './tests/testUtils';
import App from './App';

jest.mock('./pages/LoginPage/LoginPage', () => () => (
  <div data-testid="LoginPage"></div>
));

describe('App component', () => {
  test('renders login page', () => {
    render(<App />);
    const login = screen.getByTestId(/LoginPage/i);
    expect(login).toBeInTheDocument();
  });
});
