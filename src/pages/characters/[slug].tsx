import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchCharacterByName, fetchStarshipDetails } from '../../services/api';
import { Helmet } from 'react-helmet';
import { CharacterDetailType, Starship } from '../../types';
import dynamic from 'next/dynamic';
import { IoIosArrowBack } from 'react-icons/io';
import Loader from '@/utils/_loader';

const CharacterDetail = dynamic(() => import('../../components/CharacterDetails'));


const CharacterDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: character, isLoading } = useQuery(['character', slug], () => fetchCharacterDetail(slug as string), {
    enabled: !!slug,
  });

  const fetchCharacterDetail = async (slug: string) => {
    try {
      const characterDetail = await fetchCharacterByName(slug);
      if (!characterDetail) {
        throw new Error('Character not found');
      }

      const starshipDetails = await Promise.all(characterDetail.starships.map(fetchStarshipDetails));

      const characterWithStarships: CharacterDetailType = {
        ...characterDetail,
        starships: starshipDetails as Starship[],
      };

      return characterWithStarships;
    } catch (error) {
      console.error('Error fetching character details:', error);
      throw error;
    }
  };

  const formatCreationDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="character_page">
      <Helmet>
        <title>{character ? `${character.name} - Star Wars Character Explorer` : 'Loading...'}</title>
      </Helmet>
      <div>
        <Link href="/" className="index_route">
          <IoIosArrowBack /> Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CharacterDetail
            character={{
              ...character,
              created: formatCreationDate(character?.created || ''),
              starships: character?.starships || [], 
            }}
          />
        </>
      )}
    </div>
  );
};

export default CharacterDetailPage;
