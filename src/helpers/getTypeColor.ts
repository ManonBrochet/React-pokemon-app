import React from "react";

export function getTypeColor(type: string): string {
    if (type === "Feu") return "bg-red-400";
    if (type === "Eau") return "bg-blue-400";
    if (type === "Plante") return "bg-green-400";
    if (type === "Electrik") return "bg-yellow-300";
    if (type === "Poison") return "bg-purple-400";
    if (type === "Insecte") return "bg-lime-400";
    if (type === "Vol") return "bg-sky-300";
    if (type === "Roche") return "bg-stone-400";
    if (type === "Sol") return "bg-amber-600";
    if (type === "Glace") return "bg-cyan-300";
    if (type === "Dragon") return "bg-indigo-500";
    if (type === "Ténèbres") return "bg-gray-700";
    if (type === "Acier") return "bg-slate-400";
    if (type === "Fée") return "bg-rose-300";
    return "bg-gray-300";
}
export default getTypeColor;   
