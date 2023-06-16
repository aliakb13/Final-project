import NotFound from '../pages/NotFound'
import user, { initialState as userState } from '../reducers/user'
import { render, screen } from '@testing-library/react';

describe("pages test", () => {
  it('renders not-found page', () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/Not Found/i);
    expect(linkElement).toBeInTheDocument();
  });
})

describe("reducer user test", () => {
  it('should return initial state', () => {
    expect(user(undefined, {})).toEqual(userState)
  })
})

describe("token test", () => {
  const key = 'token';
  const value = { token: 'json data' };
  it('should set data into local storage', () => {
    window.localStorage.setItem(key, JSON.stringify(value));
    expect(localStorage.getItem(key)).toEqual(
      JSON.stringify(value)
    )
  })
})

afterEach(() => {
  window.localStorage.clear();
});