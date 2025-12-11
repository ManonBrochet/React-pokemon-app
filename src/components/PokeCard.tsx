import { useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { CiLink } from "react-icons/ci";
import Pokemon from "../models/pokemon";
import { getTypeColor } from "../helpers/getTypeColor";

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
  removePokemon: (id: string) => void;
};

export default function PokeCard({
  pokemon,
  borderColor = "#948c8c",
  removePokemon,
}: Props) {
  const [hover, setHover] = useState(false);

  // Sécurise les types pour éviter l'erreur .map
  const types = Array.isArray(pokemon.types)
    ? pokemon.types
    : pokemon.types
    ? [pokemon.types as unknown as string]
    : [];

  return (
    <div
      className="shadow-md size-92 p-5 transition-colors duration-300"
      style={{
        border: "2px solid",
        borderColor: hover ? "#5219a8" : borderColor,
        borderRadius: "8px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={pokemon.picture}
        alt={pokemon.name}
        className="w-48 mx-auto h-auto"
      />

      <h1 className="text-sm text-center font-bold text-black px-1 py-1 rounded-lg">
        {pokemon.name}
      </h1>

      <div className="flex justify-center gap-2 mt-2">
        {types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 rounded-lg text-xs font-bold text-black ${getTypeColor(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex justify-center mt-2">
        <CiLink className="cursor-pointer" />
      </div>

      <Link
        to={`/PokemonDetail/${pokemon.id}`}
        className="bg-red-600 text-black flex justify-center px-2 py-1 rounded-md text-xs transition mt-2"
      >
        Détails
      </Link>

      <div className="flex justify-center gap-3 mt-2">
        <ImCross
          className="cursor-pointer"
          onClick={() => removePokemon(pokemon.id)}
        />
        <CiLink className="cursor-pointer" />
      </div>
    </div>
  );
}