import { useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { CiLink } from "react-icons/ci";
import Pokemon from "../models/pokemon";

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
  removePokemon: (id: string) => void;
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

export default function PokeCard({
  pokemon,
  borderColor = "#948c8c",
  removePokemon,
}: Props) {
  const [hover, setHover] = useState(false);

  const rawTypes = pokemon.types as unknown as string | string[];

  const types: string[] = Array.isArray(rawTypes)
    ? rawTypes
    : rawTypes
    ? JSON.parse(rawTypes)
    : [];

  const cleanTypes = types.map((t) => t.trim());
  const hasPicture = pokemon.picture && pokemon.picture.trim() !== "";

  return (
    <div
      className="shadow-lg bg-white/95 p-5 transition-all duration-300 flex flex-col justify-between"
      style={{
        border: "2px solid",
        borderColor: hover ? "#5219a8" : borderColor,
        borderRadius: "12px",
        transform: hover ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        {hasPicture ? (
          <img
            src={pokemon.picture}
            alt={pokemon.name}
            className="w-40 h-40 object-contain mx-auto mb-2"
          />
        ) : (
          <div className="w-40 h-40 mx-auto mb-2 flex items-center justify-center text-gray-400 border border-dashed rounded-lg text-xs">
            Pas d'image
          </div>
        )}

        <h1 className="text-lg text-center font-bold text-gray-900 mb-1">
          {pokemon.name}
        </h1>

        <div className="flex justify-center gap-2 mt-1 flex-wrap">
          {cleanTypes.map((type) => (
            <span
              key={type}
              style={{
                backgroundColor: typeColors[type] || "#ccc",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "999px",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          to={`/PokemonDetail/${pokemon.id}`}
          className="bg-violet-600 text-white flex justify-center px-2 py-1 rounded-md text-xs font-semibold hover:bg-violet-700 transition"
        >
          Détails
        </Link>

        <div className="flex justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => removePokemon(String(pokemon.id))}
            className="text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <ImCross />
          </button>
          <span className="text-gray-500">
            <CiLink />
          </span>
        </div>
      </div>
    </div>
  );
}
