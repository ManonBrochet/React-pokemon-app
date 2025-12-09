import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import POKEMONS from "./models/mock-pokemon";
import Pokemon from "./models/pokemon";
import PokemonAdd from "./pages/pokemonAdd";


function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>(POKEMONS);

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemonList"
            element={<PokemonList pokemons={pokemons} setPokemons={setPokemons} />} />
          <Route
            path="/pokemonDetail/:id"
            element={<PokemonDetail pokemons={pokemons} setPokemons={setPokemons} />} />
          <Route path="/pokemonAdd" element={<PokemonAdd />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
