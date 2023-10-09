export interface Route {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  length: string;
  isFavorite: boolean;
  markers: number[][];
}

export interface RootState {
  routes: Route[];
  selectedRoute: Route | null;
  searchKeyword: string;
  markers: number[][]; 
  totalDistance: string;
}
