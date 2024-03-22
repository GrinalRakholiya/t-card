import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.tsx';

test('renders admin panel header', () => {
  render(<App />);
  const linkElement = screen.getByText(/admin panel/i);
  expect(linkElement).toBeInTheDocument();
});
