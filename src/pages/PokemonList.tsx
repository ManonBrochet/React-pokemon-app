import { useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";
import PokeCard from "../components/PokeCard";

type Props = {
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
};

const PokemonList = ({ pokemons, setPokemons }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await PokemonService.getPokemons();
      console.log("API pokemons:", data);

      setPokemons(data);
    } catch (err) {
      console.error("Failed to fetch pokemons:", err);
      setError("Impossible de charger les Pokémon");
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePokemon = (id: string) => {
    setPokemons(pokemons.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Chargement des Pokémon...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pokemons.map((pokemon) => (
        <PokeCard
          key={pokemon.id}
          pokemon={pokemon}
          removePokemon={handleRemovePokemon}
        />
      ))}
    </div>
  );
};

export default PokemonList;