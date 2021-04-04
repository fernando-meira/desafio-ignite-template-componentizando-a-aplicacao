import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from '../services/api';

interface IMoviesProviderProps {
  children: ReactNode;
}

interface GenreResponseProps {
  id: number;
  title: string;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
}

interface MovieProps {
  Title: string;
  imdbID: string;
  Poster: string;
  Ratings: Array<{
    Value: string;
    Source: string;
  }>;
  Runtime: string;
}

interface IMoviesContextData {
  movies: MovieProps[];
  selectedGenreId: number;
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
  handleClickButton: (id: number) => void;
}

const MoviesContext = createContext({} as IMoviesContextData);

export function MoviesProvider({ children }: IMoviesProviderProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider value={
      {
        movies,
        genres,
        selectedGenre,
        selectedGenreId,
        handleClickButton
      }
    }>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext);

  return context;
}