import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Character } from '../../types';
import CharacterListItem from '../CharacterListItem';

describe('CharacterListItem Component', () => {
  const character: Character = {
    id: 1,
    name: 'Luke Skywalker',
    birth_year: '19 BBY',
    height: '172',
    mass: '77',
  };

  it('renders character list item correctly', () => {
    const { getByText } = render(<CharacterListItem character={character} />);
    
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Height: 172 cm')).toBeInTheDocument();
  });

  it('handles missing birth year gracefully', () => {
    const characterWithoutBirthYear: Character = { ...character, birth_year: '' };
    const { getByText } = render(<CharacterListItem character={characterWithoutBirthYear} />);
    
    expect(getByText('Birth Year: N/A')).toBeInTheDocument();
  });

  it('handles missing height gracefully', () => {
    const characterWithoutHeight: Character = { ...character, height: '' };
    const { getByText } = render(<CharacterListItem character={characterWithoutHeight} />);
    
    expect(getByText('Height: N/A')).toBeInTheDocument();
  });

  it('handles missing mass gracefully', () => {
    const characterWithoutMass: Character = { ...character, mass: '' };
    const { getByText } = render(<CharacterListItem character={characterWithoutMass} />);
    
    expect(getByText('Mass: N/A')).toBeInTheDocument();
  });

});
