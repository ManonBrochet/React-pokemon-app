import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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

function AppInner() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav minimaliste */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/pokemonList"
            className="font-bold text-lg text-white no-underline"
          >
            Pokédex
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/pokemonAdd"
              className="px-3 py-1 rounded-full text-sm bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600 no-underline"
            >
              Ajouter un Pokémon
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full text-sm bg-red-600 text-white hover:bg-red-700 border border-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-4 py-8">
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
    </div>
  );
}

function App() {
  return <AppInner />;
}

export default App;
