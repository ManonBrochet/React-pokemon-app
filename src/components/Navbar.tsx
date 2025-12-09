import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/" style={{ marginRight: "1rem" }}>Accueil</Link>
            <Link to="/PokemonList" style={{ marginRight: "1rem" }}>Pokémon</Link>
            <Link to="/pokemonAdd" style={{marginRight: "1rem" }}> Ajouter un Pokémon</Link>
            <Link to="/about" style={{ marginRight: "1rem" }}>À propos</Link>
            <Link to="/contact" style={{ marginRight: "1rem" }}>Contact</Link>
        </nav>
    );
};

export default Navbar;