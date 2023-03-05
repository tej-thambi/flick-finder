import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

function WatchListScreen({navigation, route}) {
    const watchList = route.params.watchList;
    console.log(watchList);
    const [watchListData, setWatchListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = [];
          for (let i = 0; i < watchList.length; i++) {
            const id = watchList[i].imdbID;
            const response = await fetch(`http://www.omdbapi.com/?apikey=e7a5e3a8&i=${id}`);
            const result = await response.json();
            data.push(result);
          }
          setWatchListData(data);
        };
        fetchData();
      }, [watchList]);

      useEffect(() => {
        console.log(watchListData);
      }, [watchListData]);

    const renderMovieItem = ({ item }) => {
      return (
        <TouchableOpacity key={item.imdbID} onPress={() => navigation.navigate('MovieDetails', { imdbID: item.imdbID })}>
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
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={watchListData}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={styles.moviesContainer}
        />
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

  export default WatchListScreen;