import Pokemon from "../models/pokemon";

export default class PokemonService {
  private static readonly API_BASE_URL = "http://localhost:8000/api/pokemons";

  private static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  static async getPokemons(): Promise<Pokemon[]> {
    const res = await fetch(this.API_BASE_URL, { headers: this.getAuthHeaders() });
    return await res.json();
  }

  static async getPokemon(id: string): Promise<Pokemon | null> {
    const res = await fetch(`${this.API_BASE_URL}/${id}`, { headers: this.getAuthHeaders() });
    return await res.json();
  }

  static async addPokemon(pokemon: Pokemon): Promise<Pokemon | null> {
    const res = await fetch(this.API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...this.getAuthHeaders() },
      body: JSON.stringify(pokemon),
    });
    return await res.json();
  }

  static async updatePokemon(pokemon: Pokemon): Promise<Pokemon | null> {
    const res = await fetch(`${this.API_BASE_URL}/${pokemon.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...this.getAuthHeaders() },
      body: JSON.stringify(pokemon),
    });
    return await res.json();
  }

  static async deletePokemon(id: string): Promise<boolean> {
    const res = await fetch(`${this.API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders()
    });
    return res.ok;
  }
}
