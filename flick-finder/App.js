import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetailsScreen from './MovieDetailsScreen';
import WatchListScreen from './WatchListScreen';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList, Image, TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [watchList, setWatchList] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen 
        name="MovieList" 
        component={MovieListScreen} 
        initialParams={{ watchList: watchList }}
        options={{
          title: 'Flick Finder',
          headerStyle: {
            backgroundColor: '#192841'
          },
          headerTintColor: '#f2ebd4'
        }}
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetailsScreen} 
          options={{
            title: 'Movie Details',
            headerStyle: {
              backgroundColor: '#192841'
            },
            headerTintColor: '#f2ebd4'
          }}
        />
        <Stack.Screen
          name="WatchList"
          component={WatchListScreen}
          initialParams={{ watchList: watchList }}
          options={{
            title: 'Watch List',
            headerStyle: {
            backgroundColor: '#192841'
          },
          headerTintColor: '#f2ebd4'
    }}
  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MovieListScreen({navigation, route}){
  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [watchList, setWatchList] = useState(route.params.watchList || []);
  

  const addToWatchList = (movie) => {
    setWatchList([...watchList, movie]);
    console.log(watchList);
  }
  
  const searchMovies = async () => {
    const apiKey = 'e7a5e3a8';
    const apiUrl = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovieList(data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.imdbID} onPress={() => navigation.navigate('MovieDetails', {imdbID: item.imdbID})}>
        <View style={styles.movieItem}>
          <Image
            style={styles.poster}
            source={{
              uri: item.Poster,
            }}
          />
            <Text style={styles.movieTitle}>{item.Title}</Text>
            <Text> </Text>
            <Text style={styles.movieYear}>({item.Year})</Text>
            <Button style={styles.addButton} title="Add to watchlist" 
            onPress={() => addToWatchList({imdbID: item.imdbID })}/>
        </View>
      </TouchableOpacity>
    );
  };  

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter movie title"
          onChangeText={text => setSearchQuery(text)}
        />
        <Button title="Search" onPress={searchMovies} />
      </View>
      <FlatList
        data={movieList}
        renderItem={renderMovieItem}
        keyExtractor={item => item.imdbID}
        contentContainerStyle={styles.moviesContainer}
      />
      <Button style={styles.wlb} title="Watch List" onPress={() => {navigation.navigate('WatchList', { watchList: watchList })}} />
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
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 25,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f2ebd4',
    color: '#192841',
    borderRadius: 100,
  },
  wlb: {
    marginBottom: 50,
  },
  addButton: {
    fontSize: 10,
  },
  moviesContainer: {
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 30,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
    flexWrap: 'wrap',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2ebd4',
  },
  movieYear: {
    fontSize: 18,
    color: '#777',
    color: '#f2ebd4',
  },
});