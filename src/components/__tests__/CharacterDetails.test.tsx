import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterDetail from '../CharacterDetails';
import { CharacterDetailType, Starship } from '../../types';

describe('CharacterDetail Component', () => {
  const completeCharacter: CharacterDetailType = {
    name: 'Luke Skywalker',
    birth_year: '19 BBY',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    created: '2022-01-01T00:00:00Z',
    edited: '2022-01-02T00:00:00Z',
    gender: 'male',
    starships: [],
  };

  const loadingCharacter: CharacterDetailType = {
    name: 'Luke Skywalker',
    birth_year: '19 BBY',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    created: '2022-01-01T00:00:00Z',
    edited: '2022-01-02T00:00:00Z',
    gender: 'male',
    starships: [],
  };

  it('renders character details correctly with all attributes', () => {
    const { getByText } = render(<CharacterDetail character={completeCharacter} />);
    
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Birth Year: 19 BBY')).toBeInTheDocument();
    expect(getByText('Height: 172 cm')).toBeInTheDocument();
    expect(getByText('Mass: 77')).toBeInTheDocument();
    expect(getByText('Hair Color: blond')).toBeInTheDocument();
    expect(getByText('Skin Color: fair')).toBeInTheDocument();
    expect(getByText('Eye Color: blue')).toBeInTheDocument();
    expect(getByText('Gender: male')).toBeInTheDocument();
    expect(getByText('Created: 1/1/2022, 12:00:00 AM')).toBeInTheDocument();
    expect(getByText('Edited: 1/2/2022, 12:00:00 AM')).toBeInTheDocument();
  });

  it('handles loading state correctly', () => {
    const { getByText } = render(<CharacterDetail character={loadingCharacter} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('displays "No starships found" when no starships are present', () => {
    const characterWithoutStarships: CharacterDetailType = { ...completeCharacter, starships: [] };
    const { getByText } = render(<CharacterDetail character={characterWithoutStarships} />);
    
    expect(getByText('No starships found for this character.')).toBeInTheDocument();
  });
  

  it('renders starship details when starships are present', () => {
    const starship: Starship = {
      name: 'X-wing',
      model: 'T-65 X-wing',
      passengers: '1',
      length: 12.5,
      manufacturer: 'Incom Corporation',
      rating: 4.5,
  };

  const characterWithStarships: CharacterDetailType = { ...completeCharacter, starships: [starship] };
  const { getByText } = render(<CharacterDetail character={characterWithStarships} />);
    
  expect(getByText('X-wing')).toBeInTheDocument();
  expect(getByText('Model: T-65 X-wing')).toBeInTheDocument();
  expect(getByText('Passengers: 1')).toBeInTheDocument();
  expect(getByText('Length: 12.5')).toBeInTheDocument();
  expect(getByText('Manufacturer: Incom Corporation')).toBeInTheDocument();
  expect(getByText('Rating: 4.5')).toBeInTheDocument();
  });
});
