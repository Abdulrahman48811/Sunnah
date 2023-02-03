import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HadithInfo = (id) => {
  const [dataen, setdataen] = useState([]);
  const [dataar, setdataar] = useState([]);

  const HadithID = id.route.params.itemid;

  const storeData = async (value) => {
    try {
      await AsyncStorage.getItem("fav").then((favs) => {
        favs = favs == null ? [] : JSON.parse(favs);
        favs.push(value);

        return AsyncStorage.setItem("fav", JSON.stringify(favs));
      });
    } catch (error) {
      console.error();
    }
  };
  const getData = async (value) => {
    try {
      await AsyncStorage.getItem("fav").then((favs) => {
        favs = favs == null ? [] : JSON.parse(favs);
        console.log(favs);
      });
    } catch (error) {
      console.error();
    }
  };

  const getHadithAr = async () => {
    try {
      const response = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${HadithID}`
      );

      const json = await response.json();

      setdataar(json);
    } catch (error) {}
  };
  const getHadithEn = async () => {
    try {
      const response = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${HadithID}`
      );

      const json = await response.json();

      setdataen(json);
    } catch (error) {}
  };
   

  useEffect(() => {
    getHadithEn();
    getHadithAr();
    getData();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 400 }}
    >
      <View style={{ right: 180, top: 50 }}>
        <Icon name="star" color="#B08C8C" style={{ height: 29 }} />
      </View>

      <View style={{ width: 350, top: 113, left: 40 }}>
        <Text style={{ fontSize: 15, color: "#00FFEC" }}>
          {" "}
          {dataar.hadeeth}
        </Text>
        <Text style={{ top: 15, color: "#000000" }}>
          {" "}
          {dataar.attribution}{" "}
        </Text>
      </View>

      <View style={{ top: 175, left: 40, width: 350 }}>
        <Text style={{ fontSize: 15, color: "#00FFEC" }}>{dataen.hadeeth}</Text>
        {/* <Text style={{top:8}}>{dataen.grade}</Text> */}
      </View>
      <View style={{ left: 40, top: 225 }}>
        <Text style={{ fontSize: 25, color: "#246C66" }}>
          Hadith Explanation:
        </Text>
        <Text style={{ width: 350, color: "#00FFEC" }}>
          {dataen.explanation}
        </Text>
        <View style={{ left: -200, top: 10, height: 80 }}>
          <Icon
            name="bookmark"
            type="font-awesome"
            color={"#00FFEC"}
            size={45}
            onPress={() => storeData(HadithID)}
          />
        </View>
        <Text style={{ top: 15, color: "#246C66" }}>Refrence:</Text>
        <Text style={{ top: 30, width: 350, color: "#00FFEC", fontSize: 8 }}>
          {dataar.reference}
        </Text>

        <View style={{ top: 170, left: 140 }}>
          <Text style={{ color: "#00FFEC" }}>App Name</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default HadithInfo;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C3634",
  },
});
