import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Stockage user (tu pourras remplacer par le token plus tard)
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirection vers la liste de Pokémon
      navigate("/pokemonList");
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center relative">
            <div className="absolute top-2 right-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Bienvenue !
            </h1>
            <p className="text-red-100 font-medium">
              Connectez-vous à votre Pokédex
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dresseur@pokemon.com"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                  📧
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                  🔒
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isLoading ? '⚡ Connexion...' : '🎮 Se connecter'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>

            <div className="text-center pt-4">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Mot de passe oublié ? 🤔
              </a>
            </div>
          </form>

          <div className="bg-gray-50 px-8 py-4 text-center border-t">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <a href="#" className="text-blue-600 font-bold hover:underline">
                Inscrivez-vous ici ! ✨
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
