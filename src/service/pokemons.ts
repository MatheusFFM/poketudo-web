import { Pokemon } from "@/models/Pokemons/Pokemon";
import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export const api = axios.create({
  baseURL,
});

export const makeDefaultRequest = async (url: string): Promise<any> => {
  const urlRequest = url.replace(baseURL, "");
  try {
    return await api.get(urlRequest).then((res) => res.data);
  } catch (err) {
    console.error(err);
  }
};

// export const getPokemons = async (offset: number = 0, limit: number = 20) => {
//   try {
//     return await api
//       .get(`/pokemon/?offset=${offset}&limit=${limit}`)
//       .then((res) => res.data);
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getPokemon = async (id: number): Promise<Pokemon | null> => {
  try {
    return await api.get(`/pokemon/${id}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};
