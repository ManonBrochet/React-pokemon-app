import React, { useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import PokeCard from "../components/PokeCard";
import PokemonSearch from "../components/PokemonSearch";
import { useNavigate } from "react-router-dom";
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
  // fetch("http://localhost:5173/pokemons")
  // .then((res) => res.json())
  // .then((data) => setPokemons(data))
  // .catch((err) => console.error("Erreur fetch Pokémon :", err));
  // }, [setPokemons]);
  PokemonService.getPokemons()
    .then((data) => setPokemons(data))
    .catch((err) => console.error("Erreur fetch Pokémon :", err));
}, [setPokemons]);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByType = selectedType
    ? filteredPokemons.filter((pokemon) => pokemon.types.includes(selectedType))
    : filteredPokemons;

  const handleRemovePokemon = (id: string) => {
    // fetch(`http://localhost:5173/pokemons/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => {
    //     if (!res.ok) throw new Error("Erreur lors de la suppression");
    //     setPokemons((prev) => prev.filter((p) => p.id !== id));
    //   })
    //   .catch((err) => console.error("Erreur DELETE :", err));
    PokemonService.deletePokemon(Number(id))
      .then(() => {
        setPokemons((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Erreur DELETE :", err));
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
          <div key={pokemon.id} onClick={() => handleGoToDetail(pokemon.id)}>
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
