import { Specie } from "@/models/Specie/Specie";
import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export const api = axios.create({
  baseURL,
});

export const makeDefaultSpecieRequest = async (
  url: string
): Promise<Specie | null> => {
  const urlRequest = url.replace(baseURL, "");
  try {
    return await api.get(urlRequest).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getSpecie = async (id: number): Promise<Specie | null> => {
  try {
    return await api.get(`/pokemon-species/${id}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getSpecieByName = async (name: string): Promise<Specie | null> => {
  try {
    return await api.get(`/pokemon-species/${name}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};
