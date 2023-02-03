import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

const Favorites = () => {
    const [is, isnt] = useState([])
   const [HadithID, SetHadithID] = useState([])
    const getData = async (value) => {
        try {
          await AsyncStorage.getItem("fav").then((favs) => {
            favs = favs == null ? [] : JSON.parse(favs);
            isnt(new Set(favs))
          });
        } catch (error) {
          console.error();
        }
      };
       const id = [...is] 
    console.log(id)
      useEffect(() => {

        getData();
      }, []);
 return(
    <View style={styles.container}>
    
    </View>
 )
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#206565",
  },
});
