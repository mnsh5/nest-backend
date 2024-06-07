import axios from "axios";
import { HttpAdapter, PokeApiAdapter } from "../api/pokeApi.adapter";
import {
  Move,
  PokeapiReponse,
} from "../interfaces/pokeapi-response.interface.ts";

export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    private httpAdapter: HttpAdapter // Inyeccion de dependencias
  ) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    // Inyeccion de dependencias
    const data = await this.httpAdapter.get<PokeapiReponse>(
      "https://pokeapi.co/api/v2/pokemon/4"
    );
    console.log(data.moves);

    return data.moves;
  }
}

const pokeApiAxios = new PokeApiAdapter();
// const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon(4, "Charmander", pokeApiAxios);

charmander.getMoves();
