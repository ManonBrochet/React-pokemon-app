import React from "react";
import { useParams } from "react-router-dom";

const User: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Profil utilisateur</h1>
            <p>
                Bienvenue sur la page de l’utilisateur avec l’ID :
                <strong>{id}</strong>
            </p>
        </div>
    );
};
export default User;
