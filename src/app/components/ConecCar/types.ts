export interface Car {
  id: string;
  name: string;
  subtitle?: string;
  cat: string;
  seats: number;
  bags: number;
  trans: string;
  ac: boolean;
  price: number;
  badge?: string;
  img?: string;
}

export interface Destination {
  id: string;
  name: string;
  tag: string;
  distance: string;
  description: string;
  img: string;
}
