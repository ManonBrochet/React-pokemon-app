export default class Pokemon {
    id: string;
    PV: number;
    PC: number;
    name: string;
    picture: string;
    types: Array<string>;
    
    constructor(
        id: string,
        PV: number = 100,
        PC: number = 10,
        name: string = '...',
        picture: string =
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png',
        types: Array<string> = ['Normal'],
    ) {
    this.id = id;
    this.PV = PV;
    this.PC = PC;
    this.name = name;
    this.picture = picture;
    this.types = types;
    }
}
