import { Ability } from "@/models/Ability/Ability";
import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export const api = axios.create({
  baseURL,
});

export const getAbility = async (id: number): Promise<Ability | null> => {
  try {
    return await api.get(`/ability/${id}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAbilityByName = async (
  name: string
): Promise<Ability | null> => {
  try {
    return await api.get(`/ability/${name}`).then((res) => res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};
