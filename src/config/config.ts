export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const apiUrls = {
  // auth
  logOut: () => `${baseUrl}/api/auth/log-out`,
  logIn: () => `${baseUrl}/api/auth/log-in`,
  logInWithGoogle: () => `${baseUrl}/api/auth/log-in-with-google`,
  //booker
  getUserById: (id: number) => `/api/booker/${id}/search`,
  getUser: () => `${baseUrl}/api/booker`,
  putUser: () => `${baseUrl}/api/booker`,
  uploadAvatar: () => `/api/booker/avatar`,
  getImg: (img: string) => `${baseUrl}/avatar/${img}`,
  //booking
  getDisponibility: () => `${baseUrl}/api/booking/disponibility`,
  //movie
  getMovieById: (movieId: number) => `${baseUrl}/api/movie/get-movie/${movieId}`

};

export const tokenAccess = {
  tokenName: process.env.NEXT_PUBLIC_TOKEN_NAME || "token",
};

export const googleIdClient = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
