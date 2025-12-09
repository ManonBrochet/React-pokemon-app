import Pokemon from "../models/pokemon";

export default class PokemonService {

    static async getPokemons(): Promise<Pokemon[]> {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch("http://127.0.0.1:5173/api/pokemons", {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            if (!res.ok) {
                console.error("getPokemons failed", res.status);
                return [];
            }

            return (await res.json()) as Pokemon[];
        } catch (err) {
            console.error("getPokemons error", err);
            return [];
        }
    }

    static async getPokemon(id: number): Promise<Pokemon | null> {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(`http://127.0.0.1:5173/api/pokemons/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            if (!res.ok) {
                console.error("getPokemon failed", res.status);
                return null;
            }

            const data = await res.json();
            return Object.keys(data).length === 0 ? null : data;
        } catch (err) {
            console.error("getPokemon error", err);
            return null;
        }
    }

    static async deletePokemon(id: number): Promise<boolean> {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(`http://127.0.0.1:5173/api/pokemons/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            if (!res.ok) {
                console.error("deletePokemon failed", res.status);
                return false;
            }

            return true;
        } catch (err) {
            console.error("deletePokemon error", err);
            return false;
        }
    }

    static async addPokemon(pokemon: Pokemon): Promise<Pokemon | null> {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch("http://127.0.0.1:5173/api/pokemons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(pokemon),
            });

            if (!res.ok) {
                console.error("addPokemon failed", res.status);
                return null;
            }

            return (await res.json()) as Pokemon;
        } catch (err) {
            console.error("addPokemon error", err);
            return null;
        }
    }

    static async updatePokemon(pokemon: Pokemon): Promise<Pokemon | null> {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(`http://127.0.0.1:5173/api/pokemons/${pokemon.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(pokemon),
            });

            if (!res.ok) {
                console.error("updatePokemon failed", res.status);
                return null;
            }

            return (await res.json()) as Pokemon;
        } catch (err) {
            console.error("updatePokemon error", err);
            return null;
        }
    }

    static searchPokemons(query: string, pokemons: Pokemon[]): Pokemon[] {
        return pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    }
}
