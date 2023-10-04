export interface Route {
    id: number;
    name: string;
    shortDescription: string;
    fullDescription: string;
    length: string;
    isFavorite: boolean;
    markers: number[],
  }
  
  export interface RootState {
    routes: Route[];
  }