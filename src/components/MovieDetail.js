// src/components/MovieDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import moviesData from '../data/moviesData';
import '../App.css';

function MovieDetail() {
  const { id } = useParams();
  const movie = moviesData.find(movie => movie.id === parseInt(id));

  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div>
      <h2>{movie.title} ({movie.year})</h2>
      <p>Director: {movie.director}</p>
      <img src={movie.posterUrl} alt={`${movie.title} poster`} />
      <p>{movie.synopsis}</p>
      <p><strong>ID:</strong> {movie.id}</p>
    </div>
  );
}

export default MovieDetail;
