  export interface Character {
    name: string;
    birth_year: string;
    height: string;
    mass: string;
  }
  
  export interface PaginatedResponse<T> {
    count: number;
    next?: string;
    previous?: string;
    results: T[];
  }
  
  export interface CharacterDetailType extends Character {
    starships: Starship[];
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    created: string;
    edited: string;
    gender: string;
  }
  
  export interface StarshipDetail {
    name: string;
    passengers: string;
    model: string;
    length: number;
    manufacturer: string;
    rating: number;
  }

  export interface Starship {
    name: string;
    model: string;
    passengers: string;
    length: number;
    manufacturer: string;
    rating: number;
  }



