function PokemonList() {
    return (
        <div className="grid justify-center grid-cols-3 gap-5">
            <div className="shadow-md size-60 p-7">
                <img src="/pikachu.jpg" alt="pokemon pikachu" className="w-48 h-auto" />
                <h1 className="text-sm text-center font-bold text-black px-1 py-1 rounded-lg">
                    Pikachu
                </h1>
            </div>
            <div className="shadow-md size-60 p-7">
                <img src="/rattata.jpg" alt="pokemon rattata" className="w-48 h-auto" />
                <h1 className="text-sm text-center font-bold text-black px-2 py-2 rounded-lg">
                    Rattata
                </h1>
            </div><div className="shadow-md size-60 p-7">
                <img src="/roucool.jpg" alt="pokemon roucool" className="w-48 h-auto" />
                <h1 className="text-sm text-center font-bold text-black px-2 py-2 rounded-lg">
                    Roucool
                </h1>
            </div>
            <div className="shadow-md size-60 p-10">
                <img src="/salameche.jpg" alt="pokemon salameche" className="w-48 h-auto" />
                <h1 className="text-sm text-center font-bold text-black px-2 py-2 rounded-lg">
                    Salamèche
                </h1>
            </div>
            <div className="shadow-md size-60 p-7">
                <img src="/carapuce.jpg" alt="pokemon carapuce" className="w-48 h-auto" />
                <h1 className="text-sm text-center font-bold text-black px-2 py-2 rounded-lg">
                    Carapuce
                </h1>
            </div>
            <div className="shadow-md size-60 p-7">
                <img src="/bulbizarre.jpg" alt="pokemon bulbizarre" className="w-48 h-auto" />
                <h1 className="text-sm text-center font-bold text-black px-2 py-2 rounded-lg">
                    Bulbizarre
                </h1>
            </div>
        </div>


    )
}
export default PokemonList;
