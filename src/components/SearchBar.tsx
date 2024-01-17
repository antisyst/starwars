import React, { useState, useCallback } from 'react';
import { LuSearch } from "react-icons/lu";


interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    onSearch(searchQuery.trim());
  }, [onSearch, searchQuery]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}><LuSearch/></button>
    </div>
  );
};


export default SearchBar;
