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
import { Audio } from "expo-av";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import List from "./List";
import { color } from "@rneui/base";
import { TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";

const tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <tab.Navigator>
      <tab.Screen name="Home" component={HomeScreen} />
      <tab.Screen name="List" component={List} />
    </tab.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState([]);
  const [monthhijri, setMonth] = useState([]);
  const [abhijri, setAb] = useState([]);
  const [Names, setNames] = useState([]);
  // const [audio, SetAudio] = useState([]);
  // const [sound, setSound] = React.useState();
  // const [Play, setPlay] = useState("play");
  // const [playAudio, setPlayAudio] = useState(false);
  const [data, setdata] = useState([]);
  // const [unmute, mute] = useState("unmute");
  const hadeith = 65054;
  const getHadith = async () => {
    try {
      const response = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${65054}`
      );

      const json = await response.json();

      setdata(json);
    } catch (error) {}
  };
  const getNames = async () => {
    try {
      const response = await fetch(
        `http://api.aladhan.com/asmaAlHusna/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`
      );

      const json = await response.json();

      setNames(json.data);
    } catch (error) {}
  };

  // const getAudio = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://api.quran.com/api/v4/chapter_recitations/9?language=en"
  //     );

  //     const json = await response.json();
  //     SetAudio(json.audio_files[102].audio_url);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getDate = async () => {
    try {
      const response = await fetch("http://api.aladhan.com/v1/gToH");

      const json = await response.json();

      setDate(json.data.hijri);
      setMonth(json.data.hijri.month.en);
      setAb(json.data.hijri.designation.abbreviated);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const Item = ({ name, transliteration,english }) => (
    
      <View style={styles.names}>
        <Text > {name} {transliteration}</Text>
        <Text>{english} </Text>
      </View>
    
  );

  const renderItem = ({item}) => <Item name={item.name} transliteration={item.transliteration} english={item.en.meaning}/>;

  useEffect(() => {
    getDate();
    
    getHadith();
    getNames();
  }, []);
   
  let hijrimonth = monthhijri;
  let hijriDay = date.day;
  let hijriYear = date.year;
  let hijriAb = abhijri;
  let hijriDate = hijrimonth + " " + hijriDay + " " + hijriYear + " " + hijriAb;
  
 
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
           
            <Text
              style={{
                position: "absolute",
                width: 225,
                height: 24,
                left: 240,
                top: 55,
                fontSize: 20,
                lineHeight: 24,
                color: "#00FFFF",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </Text>
            
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                position: "absolute",
                width: 243,
                height: 114,
                left: 21,
                top: 100,
              }}
            >
              <Text
                style={{
                  width: 159,
                  height: 29,
                  fontSize: 24,
                  fontWeight: "400",
                  lineHeight: 29,
                  flex: "none",
                  order: 0,
                  flexGrow: 0,
                  color: "#00FFFF",
                }}
              >
                السلام عليكم
              </Text>
              <Text
                style={{
                  width: 243,
                  height: 49,
                  fontWeight: "400",
                  fontSize: 16,
                  lineHeight: 19,
                  flex: "none",
                  order: 1,
                  flexGrow: 0,
                  top: 30,
                  color: "#1A3333",
                }}
              >
                {isLoading ? <ActivityIndicator /> : hijriDate}
              </Text>
            </View>
            <View>
              <Card containerStyle={styles.hadith}>
                <Card.Title
                  style={{ color: "#1A3333" }}
                  onPress={() => {
                    navigation.navigate("HadithInfo", { itemid: hadeith });
                  }}
                >
                  Hadith Of The Day
                </Card.Title>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HadithInfo", { itemid: hadeith });
                  }}
                >
                  <Text style={{ color: "#00FFFF" }}>{data.hadeeth} </Text>
                </TouchableOpacity>
              </Card>
              <Text style={{left:150 ,color:"#19A399" ,fontSize:20, top:15 }}>
                Names of Allah:
              </Text>
            </View>
            
           
            
          </>
        }
        data={Names}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingBottom:200}}
      />
      <StatusBar style="auto" />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#206565",
  },
  hadith: {
    backgroundColor: "#129A9A",
    height: 231,
    width: 343,
    marginTop: 250,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#00FFFF",
    borderRadius: 15,
  },
  quran: {
    width: 315,
    height: 18,
    alignSelf: "center",
    top: 40,
  },
  names: {
    backgroundColor: "#00FFEC",
    alignItems:"center",
    width: 343,
    height:45,
    top:50,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#00FFFF",
    
    borderRadius: 15,
    marginVertical:5
  }
});
