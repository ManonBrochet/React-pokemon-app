import Pokemon from "../models/pokemon";

export default class PokemonService {
    private static readonly API_BASE_URL = "http://127.0.0.1:5173/api/pokemons";

    private static getAuthHeaders(): Record<string, string> {
        const token = localStorage.getItem("authToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    static async getPokemons(): Promise<Pokemon[]> {
        try {
            const res = await fetch(this.API_BASE_URL, {
                headers: this.getAuthHeaders(),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return (await res.json()) as Pokemon[];
        } catch (err) {
            console.error("Failed to fetch pokemons:", err);
            return [];
        }
    }

    static async getPokemon(id: number): Promise<Pokemon | null> {
        try {
            const res = await fetch(`${this.API_BASE_URL}/${id}`, {
                headers: this.getAuthHeaders(),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return Object.keys(data).length > 0 ? data : null;
        } catch (err) {
            console.error(`Failed to fetch pokemon ${id}:`, err);
            return null;
        }
    }

    static async deletePokemon(id: number): Promise<boolean> {
        try {
            const res = await fetch(`${this.API_BASE_URL}/${id}`, {
                method: "DELETE",
                headers: this.getAuthHeaders(),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return true;
        } catch (err) {
            console.error(`Failed to delete pokemon ${id}:`, err);
            return false;
        }
    }

    static async addPokemon(pokemon: Pokemon): Promise<Pokemon | null> {
        try {
            const res = await fetch(this.API_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...this.getAuthHeaders(),
                },
                body: JSON.stringify(pokemon),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return (await res.json()) as Pokemon;
        } catch (err) {
            console.error("Failed to add pokemon:", err);
            return null;
        }
    }

    static async updatePokemon(pokemon: Pokemon): Promise<Pokemon | null> {
        try {
            const res = await fetch(`${this.API_BASE_URL}/${pokemon.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...this.getAuthHeaders(),
                },
                body: JSON.stringify(pokemon),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return (await res.json()) as Pokemon;
        } catch (err) {
            console.error(`Failed to update pokemon ${pokemon.id}:`, err);
            return null;
        }
    }

    static searchPokemons(query: string, pokemons: Pokemon[]): Pokemon[] {
        return pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    }
}
