import React, { useState } from "react";
import POKEMONS from "../models/mock-pokemon";

import Pokemon from "../models/pokemon";
import { ImCross } from "react-icons/im";
import { CiLink } from "react-icons/ci";

export default function TeamCards() {
    const [pokemons, setPokemons] = useState<Pokemon[]>(POKEMONS);

    function getColor(type: string): string {
        if (type === "Feu") return "bg-red-400";
        if (type === "Eau") return "bg-blue-400";
        if (type === "Plante") return "bg-green-400";
        if (type === "Electrik") return "bg-yellow-300";
        if (type === "Poison") return "bg-purple-400";
        if (type === "Insecte") return "bg-lime-400";
        if (type === "Vol") return "bg-sky-300";
        if (type === "Roche") return "bg-stone-400";
        if (type === "Sol") return "bg-amber-600";
        if (type === "Glace") return "bg-cyan-300";
        if (type === "Dragon") return "bg-indigo-500";
        if (type === "Ténèbres") return "bg-gray-700";
        if (type === "Acier") return "bg-slate-400";
        if (type === "Fée") return "bg-rose-300";
        else return "bg-gray-300";
    }

    function deletePokemon(id: number) {
        setPokemons(pokemons.filter(p => p.id !== id));
    }

    return (
        <div className="grid justify-center grid-cols-3 gap-5">
            {pokemons.map((pokemon) =>
                <div key={pokemon.id}>
                    <div className={`shadow-md size-72 p-5 ${getColor(pokemon.types[0])}`}>
                        <img src={pokemon.picture} className="w-48 center h-auto" />
                        <h1 className="text-sm text-center font-bold text-black px-1 py-1 rounded-lg">
                            {pokemon.name}
                            <h2 className="text-xs text-center font-bold text-black px-1 py-1 rounded-lg">
                                {pokemon.types.join(", ")}
                            </h2>
                            <ImCross className="place-self-center" onClick={() => deletePokemon(pokemon.id)} />
                            <CiLink className="place-self-center" />
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}