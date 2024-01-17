import { Character, StarshipDetail } from "@/types";
import queryClient from "./queryClient";

export const API_BASE_URL = 'https://swapi.dev/api';
const apiCache: Record<string, any> = {};


export const fetchCharacters = async (page: number, searchQuery: string): Promise<{ characters: Character[]; totalCount: number }> => {
  try {
    const cacheKey = `characters-${page}-${searchQuery}`;
    
    if (apiCache[cacheKey]) {
      return apiCache[cacheKey];
    }

    const url = `${API_BASE_URL}/people/?page=${page}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch characters. Status: ${response.status}`);
    }

    const data = await response.json();
    const result = {
      characters: data.results || [],
      totalCount: data.count || (data.results && data.results.length) || 0,
    };

    apiCache[cacheKey] = result;

    return result;
  } catch (error: any) {
    console.error(`Error fetching characters: ${error.message}`);
    throw new Error(`Error fetching characters: ${error.message}`);
  }
};

export const fetchCharacterByName = async (name: string) => {
  try {
    const url = `${API_BASE_URL}/people/?search=${name}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0];
    }

    console.error(`Character by name '${name}' not found.`);
    throw new Error(`Character by name '${name}' not found.`);
  } catch (error: any) {
    console.error(`Error fetching character by name: ${error.message}`);
    throw new Error(`Error fetching character by name: ${error.message}`);
  }
};


export const fetchStarshipDetails = async (starshipUrl: string): Promise<StarshipDetail> => {
  try {
    const response = await fetch(starshipUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch starship details. Status: ${response.status}`);
    }

    const data = await response.json();
    return { name: data.name, passengers: data.passengers, model: data.model, length: data.length, manufacturer: data.manufacturer, rating: data.hyperdrive_rating };
  } catch (error: any) {
    console.error(`Error fetching starship details for ${starshipUrl}: ${error.message}`);
    throw error;
  }
};

export const prefetchCharacters = (page: number, searchQuery: string) => {
  return queryClient.prefetchQuery(['characters', page, searchQuery], () => fetchCharacters(page, searchQuery));
};
