import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const onSearchMock = jest.fn();

  it('calls onSearch when search button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={onSearchMock} />);
    
    const input = getByPlaceholderText('Search by name');
    const searchButton = getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith('Luke');
  });

  it('trims whitespace from the search query before triggering the search', () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={onSearchMock} />);
    
    const input = getByPlaceholderText('Search by name');
    const searchButton = getByText('Search');

    fireEvent.change(input, { target: { value: '   Luke   ' } });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith('Luke');
  });

  it('calls onSearch when Enter key is pressed in the input field', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearchMock} />);
    
    const input = getByPlaceholderText('Search by name');
    
    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(onSearchMock).toHaveBeenCalledWith('Luke');
  });
});
