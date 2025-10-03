import React, { useState } from "react";
import POKEMONS from "../models/mock-pokemon";

import Pokemon from "../models/pokemon";

export default function TeamCards() {
    const [pokemons, setPokemons] = useState<Pokemon[]>(POKEMONS);
   
    return (
        <div className="grid justify-center grid-cols-3 gap-5">
            {pokemons.map((pokemon) =>
            <div key={pokemon.id}>
                if ({pokemon.types[0] == "Plante"}){
                    <div className="shadow-md size-60 p-7 bg-green-400">
                        <img src={pokemon.picture} className="w-48 h-auto" /> 
                        <h1 className="text-sm text-center font-bold text-black px-1 py-1 rounded-lg">
                            {pokemon.name}
                        </h1>
                </div>
                }
            </div>
        )}
        </div>
    );
}