// src/components/MovieDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import moviesData from '../data/moviesData';
import '../App.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
useEffect(()=>
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=3273b7f6`)
    .then(response => response.json())
    .then(data => {
      if(data.Response){
        console.log(data);
      setMovie(data);
      setError('');
      }
      else{
        setError('No movie Found')
      }
      setLoading(false);
    
    })
      .catch(() => {
        setError('Error fetching movies.')
       }), [id])

       if(loading) return <p>Movies are loading...</p>
       
       if(error)return <p>{error}</p>



    //const movie = moviesData.find(movie => movie.id === imdbID);

  

  //if (!movie) return <h2>Movie not found</h2>;

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
