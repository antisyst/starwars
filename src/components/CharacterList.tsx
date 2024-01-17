import React from 'react';
import CharacterListItem from './CharacterListItem';
import { Character } from '../types';

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = React.memo(({ characters }) => {
  return (
    <div className='character_container'>
      {characters.map((character) => (
        <CharacterListItem key={character.name} character={character} />
      ))}
    </div>
  );
});

export default CharacterList;
