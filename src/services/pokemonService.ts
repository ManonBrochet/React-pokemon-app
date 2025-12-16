import Pokemon from "../models/pokemon";

export default class PokemonService {
  // URL correcte (sans "s")
  private static readonly API_BASE_URL = "http://localhost:8000/api/pokemon";

  private static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  static async getPokemons(): Promise<Pokemon[]> {
    const res = await fetch(this.API_BASE_URL, {
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API pokemons RAW:", data);

    // 1) si data.member est un tableau (Hydra moderne)
    if (Array.isArray(data.member)) {
      return data.member as Pokemon[];
    }

    // 2) si l’API renvoie directement un tableau
    if (Array.isArray(data)) {
      return data as Pokemon[];
    }

    // fallback
    return [];
  }

  static async getPokemon(id: string): Promise<Pokemon | null> {
    const res = await fetch(`${this.API_BASE_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return (await res.json()) as Pokemon;
  }

  static async addPokemon(pokemon: Pokemon): Promise<Pokemon | null> {
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
  }

  static async updatePokemon(pokemon: Pokemon): Promise<Pokemon | null> {
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
  }

  static async deletePokemon(id: string): Promise<boolean> {
    const res = await fetch(`${this.API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    return res.ok;
  }
}
