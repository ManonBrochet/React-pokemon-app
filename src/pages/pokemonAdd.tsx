import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";

export default function PokemonAdd() {
  const navigate = useNavigate();

  const [newPokemon, setNewPokemon] = useState<Pokemon>({
    id: "" as unknown as string,
    name: "",
    PV: 0,
    PC: 0,
    picture: "",
    types: [],
  });

  const [allTypes] = useState<string[]>([
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
    setNewPokemon((prev) => ({
      ...prev,
      [name]: name === "PV" || name === "PC" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (type: string) => {
    const types = Array.isArray(newPokemon.types)
      ? (newPokemon.types as unknown as string[])
      : [];

    if (types.includes(type)) {
      setNewPokemon({
        ...newPokemon,
        types: types.filter((t) => t !== type),
      });
    } else {
      setNewPokemon({
        ...newPokemon,
        types: [...types, type],
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

    const typesArray = Array.isArray(newPokemon.types)
      ? (newPokemon.types as unknown as string[])
      : [];

    const payload = {
      name: newPokemon.name,
      PV: newPokemon.PV,
      PC: newPokemon.PC,
      picture: newPokemon.picture,
      types: JSON.stringify(typesArray),
    };

    PokemonService.addPokemon(payload as unknown as Pokemon)
      .then(() => {
        navigate("/pokemonList");
      })
      .catch((err) => console.error("Erreur ajout Pokémon :", err));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto p-8 bg-zinc-900 border border-zinc-800 shadow-lg rounded-2xl mt-8">
        <h1 className="text-3xl font-bold mb-6">Ajouter un Pokémon</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            Nom :
            <input
              type="text"
              name="name"
              value={newPokemon.name}
              onChange={handleChange}
              className="mt-1 bg-zinc-800 text-white border border-zinc-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-zinc-500"
              required
            />
          </label>

          <label className="block text-sm">
            Points de vie (PV) :
            <input
              type="number"
              name="PV"
              value={newPokemon.PV}
              onChange={handleChange}
              className="mt-1 bg-zinc-800 text-white border border-zinc-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-zinc-500"
              required
            />
          </label>

          <label className="block text-sm">
            Points de combat (PC) :
            <input
              type="number"
              name="PC"
              value={newPokemon.PC}
              onChange={handleChange}
              className="mt-1 bg-zinc-800 text-white border border-zinc-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-zinc-500"
              required
            />
          </label>

          <label className="block text-sm">
            Image :
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 bg-zinc-800 text-white border border-zinc-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </label>

          <fieldset className="border border-zinc-700 p-4 rounded">
            <legend className="font-semibold mb-2 text-sm">
              Types
            </legend>
            <div className="flex flex-wrap gap-3 text-sm">
              {allTypes.map((type) => {
                const types = Array.isArray(newPokemon.types)
                  ? (newPokemon.types as unknown as string[])
                  : [];
                const checked = types.includes(type);

                return (
                  <label
                    key={type}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full border ${
                      checked
                        ? "bg-zinc-800 border-zinc-500"
                        : "border-zinc-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleTypeChange(type)}
                      className="accent-zinc-500"
                    />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 border border-zinc-600"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
