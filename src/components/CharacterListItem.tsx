import React from 'react';
import Link from 'next/link';
import { Character } from '../types';

interface CharacterListItemProps {
  character: Character;
}

const CharacterListItem: React.FC<CharacterListItemProps> = React.memo(({ character }) => {
  const encodedName = encodeURIComponent(character.name);
  return (
      <Link href={`/characters/${encodedName}`} className="character-item">
      <div>
        <h2>{character.name}</h2>
        <p>Height: {character.height} cm</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Mass: {character.mass}</p>
      </div>
      <div className='side'></div>
    </Link>
  );
});

export default CharacterListItem;
