import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import { Button, Icon } from "react-native-elements";
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

  useEffect(() => {
    getDate();

    getHadith();
  }, []);

  let hijrimonth = monthhijri;
  let hijriDay = date.day;
  let hijriYear = date.year;
  let hijriAb = abhijri;
  let hijriDate = hijrimonth + " " + hijriDay + " " + hijriYear + " " + hijriAb;

  return (
    <ScrollView style={styles.container}>
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
        {/* <Text style={{left:150 ,color:"#19A399" ,fontSize:20, top:15 }}>
                Names of Allah:
              </Text> */}
        <TouchableOpacity
          style={styles.names}
          onPress={() => {
            navigation.navigate("NamesOfA");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 5,
              color: "#1A3333",
            }}
          >
            Names of Allah
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              marginLeft: 10,
              marginRight: 5,
              marginTop: 5,
              color: "#1A3333",
            }}
          >
            Prophet Muhammad (ﷺ) said, “Allah has ninety-nine names, i.e.
            one-hundred minus one, and whoever knows them will go to Paradise.”
            (Sahih Bukhari 50:894)
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NamesOfA");
            }}
            style={{ borderRadius: 9 }}
          >
            <View style={{ borderRadius: 9, borderWidth: 1, marginTop: 7, borderColor: "#1A2333" }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  marginRight: 50, marginLeft: 50,
                  // marginRight:
                  marginTop: 3,
                  marginBottom: 3,
                  color: "#1A2333",
                }}
              >
                View All
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
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
    backgroundColor: "#129A9A",
    height: 105,
    width: 343,
    marginTop: 25,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#00FFFF",
    borderRadius: 15,
    alignItems:"center"
  },
});
