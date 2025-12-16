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
import Pokemon from "./models/pokemon";
import PokemonAdd from "./pages/pokemonAdd";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // Laisse l’API remplir la liste
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          {/* Accueil publique */}
          <Route path="/" element={<Home />} />

          {/* Pages protégées */}
          <Route
            path="/pokemonList"
            element={
              <ProtectedRoute>
                <PokemonList pokemons={pokemons} setPokemons={setPokemons} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pokemonDetail/:id"
            element={
              <ProtectedRoute>
                <PokemonDetail pokemons={pokemons} setPokemons={setPokemons} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pokemonAdd"
            element={
              <ProtectedRoute>
                <PokemonAdd />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Pages publiques */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/login" element={<Login />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;