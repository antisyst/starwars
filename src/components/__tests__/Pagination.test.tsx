import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const onChangeMock = jest.fn();

  it('renders pagination correctly', () => {
    const { getByLabelText, getByText } = render(
      <Pagination total={20} page={1} onChange={onChangeMock} loading={false} itemsPerPage={10} />
    );
    
    expect(getByLabelText('Previous Page')).toBeInTheDocument();
    expect(getByText('1')).toHaveClass('active');
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Next Page')).toBeInTheDocument();
  });

  it('calls onChange with the correct page when a page number is clicked', () => {
    const { getByText } = render(
      <Pagination total={30} page={2} onChange={onChangeMock} loading={false} itemsPerPage={10} />
    );
    
    fireEvent.click(getByText('3'));
    expect(onChangeMock).toHaveBeenCalledWith(3);
  });

  it('calls onChange with the correct page when the Previous Page button is clicked', () => {
    const { getByLabelText } = render(
      <Pagination total={40} page={3} onChange={onChangeMock} loading={false} itemsPerPage={10} />
    );
    
    fireEvent.click(getByLabelText('Previous Page'));
    expect(onChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onChange with the correct page when the Next Page button is clicked', () => {
    const { getByLabelText } = render(
      <Pagination total={50} page={4} onChange={onChangeMock} loading={false} itemsPerPage={10} />
    );
    
    fireEvent.click(getByLabelText('Next Page'));
    expect(onChangeMock).toHaveBeenCalledWith(5);
  });

  it('disables Previous Page and Next Page buttons when on the first and last page, respectively', () => {
    const { getByLabelText } = render(
      <Pagination total={10} page={1} onChange={onChangeMock} loading={false} itemsPerPage={10} />
    );
    
    expect(getByLabelText('Previous Page')).toBeDisabled();
    expect(getByLabelText('Next Page')).toBeEnabled();
  });
});
