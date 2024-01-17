import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';
import Pagination from '../components/Pagination';
import { fetchCharacters } from '../services/api';
import { Character } from '../types';
import Loader from '@/utils/_loader';

const Home: React.FC<{ characters: Character[]; totalCount: number }> = ({ characters, totalCount }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingPageChange, setIsLoadingPageChange] = useState<boolean>(false);

  const { data: charactersData, isLoading } = useQuery(
    ['characters', currentPage, searchQuery],
    () => fetchCharacters(currentPage, searchQuery),
    {
      initialData: { characters, totalCount },
    }
  );

  useEffect(() => {
    setIsLoadingPageChange(true);

    const delayTimer = setTimeout(() => {
      setIsLoadingPageChange(false);
    }, 1300);

    return () => clearTimeout(delayTimer);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <main>
        <h1>Star Wars Character Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        {(isLoadingPageChange || isLoading) ? (
          <Loader />
        ) : (
          <>
            <CharacterList characters={charactersData?.characters || []} />
          </>
        )}
          <Pagination total={charactersData?.totalCount || 0} page={currentPage} onChange={handlePageChange} loading={isLoading} itemsPerPage={10} />
      </main>
    </>
  );
};

export async function getStaticProps() {
  try {
    const { characters, totalCount } = await fetchCharacters(1, '');
    return { props: { characters, totalCount }, revalidate: 60 * 5 };
  } catch (error) {
    console.error('Error:', error);
    return { props: { characters: [], totalCount: 0 } };
  }
}

export default Home;
