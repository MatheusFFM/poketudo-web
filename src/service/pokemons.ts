import { Pokemon } from "@/models/Pokemons/Pokemon";
import { PokemonsList } from "@/models/PokemonsList/PokemonsList";
import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export const api = axios.create({
  baseURL,
});

export const makeDefaultRequest = async (
  url: string
): Promise<Pokemon | null> => {
  const urlRequest = url.replace(baseURL, "");
  try {
    return await api.get(urlRequest).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPokemons = async (
  offset = 0,
  limit = 20
): Promise<PokemonsList | null> => {
  try {
    const retorno = await api
      .get(`/pokemon/?offset=${offset}&limit=${limit}`)
      .then((res) => res.data);
    return retorno;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPokemon = async (id: number): Promise<Pokemon | null> => {
  try {
    return await api.get(`/pokemon/${id}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPokemonsByName = async (
  name: string
): Promise<Pokemon | null> => {
  try {
    return await api.get(`/pokemon/${name}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};
