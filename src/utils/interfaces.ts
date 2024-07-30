export type UserProps = {
  id: number;
  create: string;
  update: string;
  email: string;
  avatar: string;
  last_login: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export type DisponibilityProps = {
  name: string;
  auditorium_id: number;
  three: boolean;
  five: boolean;
  seven: boolean;
}

export type MovieProps = {
  title: string;
  description: string;
  director: string;
}

export type ReservationProps = {
  movieId: number;
  auditorium_id: number;
  hour: string;
  price: number;
}