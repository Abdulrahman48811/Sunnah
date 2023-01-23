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
import { TouchableOpacity } from "react-native-gesture-handler";
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
  const [audio, SetAudio] = useState([]);
  const [sound, setSound] = React.useState();
  const [Play, setPlay] = useState("play");
  const [playAudio, setPlayAudio] = useState(false);
  const [data, setdata] = useState([]);
  const [unmute, mute] = useState("unmute");
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

  const getAudio = async () => {
    try {
      const response = await fetch(
        "https://api.quran.com/api/v4/chapter_recitations/9?language=en"
      );

      const json = await response.json();
      SetAudio(json.audio_files[102].audio_url);
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
    getAudio();
    getHadith();
  }, []);
  let quranAudio = audio;
  let hijrimonth = monthhijri;
  let hijriDay = date.day;
  let hijriYear = date.year;
  let hijriAb = abhijri;
  let hijriDate = hijrimonth + " " + hijriDay + " " + hijriYear + " " + hijriAb;

  let status = Play;
  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          width: 225,
          height: 24,
          left: 240,
          top: 55,
          fontSize: 20,
          lineHeight: 24,
          color: "#ffffff",
        }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </Text>
      <Link to="google.com"></Link>
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
          }}
        >
          {isLoading ? <ActivityIndicator /> : hijriDate}
        </Text>
      </View>

      <View>
        <Card containerStyle={styles.hadith}>
          <Card.Title
            onPress={() => {
              navigation.navigate("HadithInfo", { hadeith });
            }}
          >
            Hadith Of The Day
          </Card.Title>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HadithInfo", { itemid: hadeith });
            }}
          >
            <Text>{data.hadeeth} </Text>
          </TouchableOpacity>
        </Card>
      </View>
      <Text style={styles.quran}>
        Quran recitation of the Day: Minshawi Al-Asr
      </Text>
      <View style={styles.audio}>
        <View style={{ top: 17, left: 35 }}>
          <Icon
            name={status}
            type="font-awesome"
            color="black"
            style={{ width: 20, height: 26.3 }}
            onPress={async () => {
              if (!playAudio) {
                await Audio.Sound.createAsync(
                  { uri: audio },
                  { shouldPlay: "true" }
                );

                setPlay("pause");
                setPlayAudio(true);
              } else {
                setPlay("play");
                setPlayAudio(false);
              }
            }}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#94b8f7",
  },
  hadith: {
    backgroundColor: "#A5E1F4",
    height: 231,
    width: 343,
    marginTop: 250,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
  quran: {
    width: 315,
    height: 18,
    alignSelf: "center",
    top: 40,
  },
  audio: {
    position: "absolute",
    width: 330,
    height: 60,
    left: 50,
    top: 590,
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
  },
});
