import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useState, useEffect } from "react";
import { Card } from "react-native-elements";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import List from "./List";
import { color } from "@rneui/base";
import { TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";



const NamesOfA = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
 
  const [Names, setNames] = useState([]);
  
  
 

  const getNames = async () => {
    try {
      const response = await fetch(
        `http://api.aladhan.com/asmaAlHusna/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`
      );

      const json = await response.json();

      setNames(json.data);
    } catch (error) {}
  };


  const Item = ({ name, transliteration,english }) => (
    
      <View style={styles.names}>
        <Text > {name} {transliteration}</Text>
        <Text>{english} </Text>
      </View>
    
  );
  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      transliteration={item.transliteration}
      english={item.en.meaning}
      id = {item.number}
    />
  );
  useEffect(() => {
    getNames();
  }, []);



  return (
    <View style={styles.container}>
      <FlatList showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={{left:120, top:50 , fontSize:24}}>99 Names of Allah</Text>
          </>
        }
        data={Names}
        renderItem={renderItem}
        keyExtractor={(Item) => Item.id}
        contentContainerStyle={{paddingBottom:200}}
      />
      <StatusBar style="auto" />
    </View>
  );
};
export default NamesOfA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#206565",
  },
  names: {
    backgroundColor: "#00FFEC",
    alignItems: "center",
    width: 343,
    height: 45,
    top: 100,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#00FFFF",

    borderRadius: 15,
    marginVertical: 5,
  },
});
