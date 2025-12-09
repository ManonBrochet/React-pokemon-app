import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page non trouvée.</h2>
      <p className="text-gray-600 mb-6">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Retour à l’accueil
      </button>
    </div>
  );
};

export default NotFound;
