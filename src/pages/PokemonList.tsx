import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";
import deletePokemon from "../components/Team-cards";

function PokemonList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {POKEMONS.map((pokemon) => (
                <PokeCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    borderColor="#5219a8ff"
                    deletePokemon={deletePokemon}
                />
            ))}
        </div>
    )
}

type Props = {
    pokemon: Pokemon;
    borderColor?: string; // Ajout d'une prop optionnelle pour la couleur de la bordure
    deletePokemon: (id: number) => void;
}

export default function PokeCard({pokemon, borderColor="#948c8cff", deletePokemon }: Props) {
    style={{ borderColor: borderColor }}
}