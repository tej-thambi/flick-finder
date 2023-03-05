import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function MovieDetailsScreen({route}) {
  const { imdbID } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = 'e7a5e3a8';
      const apiUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [imdbID]);

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movieDetails.Title}</Text>
      <Image style={styles.poster} source={{ uri: movieDetails.Poster }} />
      <Text style={styles.subdetailsText}>Runtime: {movieDetails.Runtime} | 
      Rated: {movieDetails.Rated} | Released: {movieDetails.Released}</Text>
      <Text style={styles.detailsText}>Director: {movieDetails.Director}</Text>
      <Text style={styles.detailsText}>Actors: {movieDetails.Actors}</Text>
      <Text style={styles.detailsText}>Genre: {movieDetails.Genre}</Text>
      <Text style={styles.detailsText}>Description: {movieDetails.Plot}</Text>
      <Text style={styles.sectionHeadText}>Ratings</Text>
      <Text style={styles.detailsText}>IMDB: {movieDetails.imdbRating}/10</Text>
      <Text style={styles.detailsText}>
      {movieDetails.Ratings.map((rating) => {
        if (rating.Source === 'Rotten Tomatoes') {
          return ` Rotten Tomatoes: ${rating.Value}`;
        }
        return '';
      })}
      </Text>
      <Text style={styles.detailsText}>
      {movieDetails.Ratings.map((rating) => {
        if (rating.Source === 'Metacritic') {
          return ` Metacritic: ${rating.Value}`;
        }
        return '';
      })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192841',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#f2ebd4",
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#f2ebd4",
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#f2ebd4",
  },
  subdetailsText: {
    fontSize: 14,
    marginBottom: 10,
    color: "#f2ebd4",
  },
  sectionHeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: "#f2ebd4",
  },
});

  export default MovieDetailsScreen;