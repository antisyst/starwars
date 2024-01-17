import React from 'react';
import { CharacterDetailType, StarshipDetail } from '../types';

interface CharacterDetailProps {
  character: Partial<CharacterDetailType>;
}


const CharacterDetail: React.FC<CharacterDetailProps> = React.memo(({ character }) => {
  return (
    <div className="character-detail">
       <h1 className='name'>{character.name}</h1>
          <p>Birth Year: <span>{character.birth_year}</span></p>
          <p>Height: <span>{character.height} cm</span></p>
          <p>Hair Color: <span>{character.hair_color}</span></p>
          <p>Eye Color: <span>{character.eye_color}</span></p>
          <p>Skin Color: <span>{character.skin_color}</span></p>
          <p>Gender: <span>{character.gender}</span></p>
          <p>Mass: <span>{character.mass}</span></p>
          <p>Created: <span>{character.created}</span></p>
          <p>Edited: <span>{character.edited}</span></p>
      <h2 className='starship_content'>Starships</h2>
      {character.starships && character.starships.length > 0 ? (
        <div className='starships'>
          {character.starships.map((starship: StarshipDetail) => (
            <div key={starship.name} className='item'>
              <h3>{starship.name}</h3>
                <p>Model: {starship.model}</p>
                <p>Passengers: {starship.passengers}</p>
                <p>Length: {starship.length}</p>
                <p>Manufacturer: {starship.manufacturer}</p>
                <p>Rating: {starship.rating}</p>
            </div>
          ))}
        </div>
      ) : (
          <p className='not_found'>No starships found for this character.</p>
      )}
    </div>
  );
});

export default CharacterDetail;
