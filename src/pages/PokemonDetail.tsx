import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";

type Props = {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
};

export default function PokemonDetail({ pokemons, setPokemons }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [editedPokemon, setEditedPokemon] = useState<Pokemon | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const allTypes = Array.from(new Set(pokemons.flatMap((p) => p.types))).sort();

  useEffect(() => {
    if (id) {
  //     fetch(`http://localhost:5173/pokemons/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data) {
  //           setPokemon(data);
  //           setEditedPokemon(data);
  //         }
  //       })
  //       .catch((err) => console.error("Erreur fetch Pokémon :", err));
  //   }
  // }, [id]);
      PokemonService.getPokemon(Number(id))
        .then((data) => {
          if (data) {
            setPokemon(data);
            setEditedPokemon(data);
          }
        })
        .catch((err) => console.error("Erreur fetch Pokémon :", err));
    }
  }, [id]);

  if (!pokemon || !editedPokemon) return <p>Chargement du Pokémon...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPokemon({
      ...editedPokemon,
      [name]: name === "PV" || name === "PC" ? Number(value) : value,
    });
  };

  const handleTypeChange = (type: string) => {
    if (editedPokemon.types.includes(type)) {
      setEditedPokemon({
        ...editedPokemon,
        types: editedPokemon.types.filter((t) => t !== type),
      });
    } else {
      setEditedPokemon({
        ...editedPokemon,
        types: [...editedPokemon.types, type],
      });
    }
  };

  const handleUpdate = (updatedPokemon: Pokemon) => {
    if (!id) return;

    // fetch(`http://localhost:5173/pokemons/${id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(updatedPokemon),
    //   headers: { "Content-Type": "application/json" },
    PokemonService.updatePokemon(updatedPokemon)
      .then((data) => {
        setPokemon(data);
        setEditedPokemon(data);
        setPokemons((prev) =>
          prev.map((p) => (p.id === data.id ? data : p))
        );
        navigate(`/PokemonList`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded-2xl relative">
      <button className="absolute top-4 right-4 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700" onClick={() => setIsEditing(!isEditing)} title="Éditer le Pokémon">
        i
      </button>

      {!isEditing ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
          <img src={pokemon.picture} alt={pokemon.name} className="w-64 h-64 mx-auto mb-4" />
          <p>
            <strong>Type :</strong>{" "}
            {pokemon.types.map((type) => (
              <span key={type} style={{ backgroundColor: typeColors[type] || "#ccc", color: "#fff", padding: "2px 6px", borderRadius: "4px", marginRight: "4px", display: "inline-block",}}>
                {type}
              </span>
            ))}
          </p>
          <p>
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
            <input type="text" name="name" value={editedPokemon.name} onChange={handleChange} className="border p-2 rounded w-full" />
          </label>

          <label className="block">
            Points de vie (PV) :
            <input type="number" name="PV" value={editedPokemon.PV} onChange={handleChange} className="border p-2 rounded w-full" />
          </label>

          <label className="block">
            Points de combat (PC) :
            <input type="number" name="PC" value={editedPokemon.PC} onChange={handleChange} className="border p-2 rounded w-full" />
          </label>

          <fieldset className="border p-4 rounded">
            <legend className="font-semibold mb-2">Types</legend>
            {allTypes.map((type) => (
              <label key={type} style={{color: typeColors[type] || "#000", marginRight: "10px", fontWeight: "bold"}}>
                <input type="checkbox" checked={editedPokemon.types.includes(type)} onChange={() => handleTypeChange(type)} className="mr-1"/>
                {type}
              </label>
            ))}
          </fieldset>

          <div className="flex justify-between mt-6">
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Annuler
            </button>
            <button onClick={() => handleUpdate(editedPokemon)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
