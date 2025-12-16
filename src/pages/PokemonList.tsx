import { useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";
import PokeCard from "../components/PokeCard";

type Props = {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
};

const PokemonList = ({ pokemons, setPokemons }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const handleRemovePokemon = async (id: string) => {
    const ok = await PokemonService.deletePokemon(id);
    if (!ok) return;

    setPokemons((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-gray-200 text-lg">Chargement des Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            Pokédex
            <span className="ml-2 text-gray-400 text-base">
              ({filtered.length})
            </span>
          </h1>

          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 text-white placeholder-gray-500 border border-zinc-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        {/* grille : 1 colonne mobile, 2 colonnes desktop */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {filtered.map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              pokemon={pokemon}
              removePokemon={handleRemovePokemon}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Aucun Pokémon ne correspond à ta recherche.
          </p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
