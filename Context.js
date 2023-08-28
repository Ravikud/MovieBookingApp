import { Context, createContext, useState } from "react";

const MovieCard = createContext();

const MovieContext = ({ children }) => {
  const [seats, setSeats] = useState([]);
  return (
    <MovieCard.Provider value={{ seats, setSeats }}>
      {children}
    </MovieCard.Provider>
  );
};

export { MovieCard, MovieContext };
