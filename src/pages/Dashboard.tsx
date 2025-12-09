import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Tableau de bord</h1>
            <nav style={{ marginBottom: "1rem" }}>
                <Link to="profile" style={{ marginRight: "1rem" }}>Profil</Link>
                <Link to="settings">Paramètres</Link>
            </nav>

            {/* Ici s’affichera la sous-page choisie */}
            <Outlet />
        </div>
    );
};

export default Dashboard;
