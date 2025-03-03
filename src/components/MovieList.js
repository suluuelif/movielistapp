// src/components/MovieList.js
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import moviesData from '../data/moviesData';

function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>
    fetch(`http://www.omdbapi.com/?s=potter&apikey=3273b7f6`)
      .then(response => response.json())
      .then(data => {
        if(data.Search){
          console.log(data);
        setMoviesData(data);
        setError('');
        }
        else{
          setError('No movies Found')
        }
        setLoading(false);
      
      })

      .catch(() => {
        setError('Error fetching movies.')
       }), [])
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterMovies(event.target.value);
  };

  useEffect(() =>{
    setFilteredMovies(moviesData);
  }, [moviesData]);

  const filterMovies = (term) => {
    const filtered = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered);
    setLoading(false);
  };

  if(loading){
    return <p>Movies are loading...</p>
  }

  if(error){
    return <p>Error...</p>
  }

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
