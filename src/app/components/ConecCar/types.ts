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

export interface DestinationImg {
  sm: string;
  md: string;
  lg: string;
}

export interface Destination {
  id: string;
  img: DestinationImg;
}
