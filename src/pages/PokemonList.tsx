import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokeCard from "../components/PokeCard";
import PokemonSearch from "../components/PokemonSearch";
import PokemonService from "../services/pokemonService";

type Props = {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
};

export default function PokemonList({ pokemons, setPokemons }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [borderColor, setBorderColor] = useState<string>("#948c8c");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await PokemonService.getPokemons();
        setPokemons(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des Pokémon :", err);
      }
    };
    fetchPokemons();
  }, [setPokemons]);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByType = selectedType
    ? filteredPokemons.filter((pokemon) => pokemon.types.includes(selectedType))
    : filteredPokemons;

  const handleRemovePokemon = async (id: string) => {
    try {
      const success = await PokemonService.deletePokemon(Number(id));
      if (success) {
        setPokemons((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du Pokémon :", err);
    }
  };

  const handleGoToDetail = (id: string) => {
    navigate(`/PokemonDetail/${id}`);
  };

  return (
    <>
      <PokemonSearch
        onSearchChange={setSearchQuery}
        onTypeChange={setSelectedType}
        query={searchQuery}
        selectedType={selectedType}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredByType.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => handleGoToDetail(String(pokemon.id))}
          >
            <PokeCard
              pokemon={pokemon}
              borderColor={borderColor}
              removePokemon={handleRemovePokemon}
            />
          </div>
        ))}
      </div>
    </>
  );
}
