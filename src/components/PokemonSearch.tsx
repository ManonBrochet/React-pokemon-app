import { useState } from "react";
import { POKEMONS } from "../models/mock-pokemon";

type Props = {
  onSearchChange: (query: string) => void;
  onTypeChange: (type: string) => void;
  query: string;
  selectedType: string;
};

function SearchBar({ onSearchChange, onTypeChange, query, selectedType }: Props) {
  const [inputValue, setInputValue] = useState(query);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value);
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const type = e.target.value;
    onTypeChange(type);
  }

  const allTypes = Array.from(new Set(POKEMONS.flatMap((p) => p.types))).sort();

  return (
    <div className="w-full max-w-2xl mx-auto p-10">
      <div className="flex text-xl mb-6">
        <input
          type="text"
          className="w-full border border-gray-400 placeholder-gray-400 text-gray-900 p-4 rounded-l-md"
          placeholder="Chercher un Pokémon"
          onChange={handleSearch}
          value={inputValue}
        />
        <button
          className="bg-blue-600 text-black px-4 rounded-r-md"
          onClick={() => onSearchChange(inputValue)}
        >
          <span className="material-icons">search</span>
        </button>
        <select
          className="ml-4 border border-gray-400 text-gray-900 p-4 rounded-md"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="">Tous</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
