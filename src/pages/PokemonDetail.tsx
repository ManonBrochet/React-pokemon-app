import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";

type Props = {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
};

const typeColors: Record<string, string> = {
  Feu: "#F08030",
  Eau: "#6890F0",
  Plante: "#78C850",
  Electrik: "#F8D030",
  Roche: "#B8A038",
  Normal: "#A8A878",
  Combat: "#C03028",
  Poison: "#A040A0",
  Sol: "#E0C068",
  Insecte: "#A8B820",
  Vol: "#A890F0",
  Spectre: "#705898",
  Glace: "#98D8D8",
  Dragon: "#7038F8",
  Fée: "#EE99AC",
};

export default function PokemonDetail({ pokemons, setPokemons }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [editedPokemon, setEditedPokemon] = useState<Pokemon | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const allTypes = Array.from(
    new Set(
      pokemons.flatMap((p) =>
        Array.isArray(p.types) ? p.types : p.types ? [p.types as unknown as string] : []
      )
    )
  ).sort();

  useEffect(() => {
    if (!id) return;

    const found = pokemons.find((p) => String(p.id) === String(id));
    if (!found) {
      setError("Pokémon introuvable");
      return;
    }
    setPokemon(found);
    setEditedPokemon({ ...found });
  }, [id, pokemons]);

  if (error) {
    return (
      <div className="text-center text-white">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 rounded-lg"
          onClick={() => navigate("/pokemonList")}
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  if (!pokemon || !editedPokemon) {
    return <p className="text-center text-white">Chargement du Pokémon...</p>;
  }

  const safeTypes = Array.isArray(pokemon.types)
    ? pokemon.types
    : pokemon.types
    ? [pokemon.types as unknown as string]
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedPokemon({
      ...editedPokemon,
      [name]:
        name === "PV" || name === "PC"
          ? Number(value)
          : (value as unknown as string),
    });
  };

  const handleTypeChange = (type: string) => {
    const currentTypes = Array.isArray(editedPokemon.types)
      ? editedPokemon.types
      : editedPokemon.types
      ? [editedPokemon.types as unknown as string]
      : [];

    if (currentTypes.includes(type)) {
      setEditedPokemon({
        ...editedPokemon,
        types: currentTypes.filter((t) => t !== type),
      });
    } else {
      setEditedPokemon({
        ...editedPokemon,
        types: [...currentTypes, type],
      });
    }
  };

  const handleUpdate = async () => {
    if (!editedPokemon) return;

    setError("");

    const updated = await PokemonService.updatePokemon(editedPokemon);

    if (!updated) {
      setError("Impossible d’enregistrer les modifications (API).");
      return;
    }

    setPokemons((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setPokemon(updated);
    setEditedPokemon(updated);
    setIsEditing(false);
    navigate("/pokemonList");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded-2xl relative">
      <button
        className="absolute top-4 right-4 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700"
        onClick={() => setIsEditing(!isEditing)}
        title="Éditer le Pokémon"
      >
        i
      </button>

      {!isEditing ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
          <img
            src={pokemon.picture}
            alt={pokemon.name}
            className="w-64 h-64 mx-auto mb-4"
          />
          <p className="mb-2">
            <strong>Type :</strong>{" "}
            {safeTypes.map((type) => (
              <span
                key={type}
                style={{
                  backgroundColor: typeColors[type] || "#ccc",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  marginRight: "4px",
                  display: "inline-block",
                }}
              >
                {type}
              </span>
            ))}
          </p>
          <p className="mb-1">
            <strong>PV :</strong> {pokemon.PV}
          </p>
          <p>
            <strong>PC :</strong> {pokemon.PC}
          </p>
        </>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-2">
            Modifier {editedPokemon.name}
          </h2>

          <label className="block">
            Nom :
            <input
              type="text"
              name="name"
              value={editedPokemon.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block">
            Points de vie (PV) :
            <input
              type="number"
              name="PV"
              value={editedPokemon.PV}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block">
            Points de combat (PC) :
            <input
              type="number"
              name="PC"
              value={editedPokemon.PC}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          <fieldset className="border p-4 rounded">
            <legend className="font-semibold mb-2">Types</legend>
            {allTypes.map((type) => {
              const currentTypes = Array.isArray(editedPokemon.types)
                ? editedPokemon.types
                : editedPokemon.types
                ? [editedPokemon.types as unknown as string]
                : [];
              return (
                <label
                  key={type}
                  style={{
                    color: typeColors[type] || "#000",
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={currentTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="mr-1"
                  />
                  {type}
                </label>
              );
            })}
          </fieldset>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
