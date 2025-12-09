import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";

export default function PokemonAdd() {
  const navigate = useNavigate();

  const [newPokemon, setNewPokemon] = useState<Pokemon>({
    id: Math.floor(Math.random() * 10000).toString(),
    name: "",
    PV: 0,
    PC: 0,
    picture: "",
    types: [],
  });

  const [allTypes] = useState([
    "Feu",
    "Eau",
    "Plante",
    "Electrik",
    "Roche",
    "Normal",
    "Combat",
    "Poison",
    "Sol",
    "Insecte",
    "Vol",
    "Spectre",
    "Glace",
    "Dragon",
    "Fée",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPokemon({
      ...newPokemon,
      [name]: name === "PV" || name === "PC" ? Number(value) : value,
    });
  };

  const handleTypeChange = (type: string) => {
    if (newPokemon.types.includes(type)) {
      setNewPokemon({
        ...newPokemon,
        types: newPokemon.types.filter((t) => t !== type),
      });
    } else {
      setNewPokemon({
        ...newPokemon,
        types: [...newPokemon.types, type],
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setNewPokemon((prev) => ({
      ...prev,
      picture: imageUrl,
    }));
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // fetch("http://localhost:5173/pokemons", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...newPokemon,
        
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Erreur ajout Pokémon");
    //     return response.json();
    //   })
    //   .then(() => {
    //     navigate("/pokemonList");
    //   })
    //   .catch((err) => console.error("Erreur POST Pokémon :", err));
    PokemonService.addPokemon(newPokemon)
      .then(() => {
        navigate("/pokemonList");
      })
      .catch((err) => console.error("Erreur ajout Pokémon :", err));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Ajouter un Pokémon</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Nom :
          <input type="text" name="name" value={newPokemon.name} onChange={handleChange} className="border p-2 rounded w-full" required/>
        </label>

        <label className="block">
          Points de vie (PV) :
          <input type="number" name="PV" value={newPokemon.PV} onChange={handleChange} className="border p-2 rounded w-full" required />
        </label>

        <label className="block">
          Points de combat (PC) :
          <input type="number" name="PC" value={newPokemon.PC} onChange={handleChange} className="border p-2 rounded w-full" required />
        </label>

        <label className="block">
          Image:
          <input type="file" name="picture" accept="image/*" onChange={handleFileChange} className="border p-2 rounded w-full"/>
        </label>

        <fieldset className="border p-4 rounded">
          <legend className="font-semibold mb-2">Types</legend>
          {allTypes.map((type) => (
            <label key={type} className="mr-3">
              <input type="checkbox" checked={newPokemon.types.includes(type)} onChange={() => handleTypeChange(type)} className="mr-1"/>
              {type}
            </label>
          ))}
        </fieldset>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Ajouter
        </button>
      </form>
    </div>
  );
}
