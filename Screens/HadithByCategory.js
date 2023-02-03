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

import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const HadithList = (id) => {
  const HadithID = id.route.params.HadithID;
  const title = id.route.params.category;
  const navigation = id.route.params.navigate;

  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState();
  const getHadithList = async () => {
    try {
      const response = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=${HadithID}&page=1&per_page=100`
      );

      const json = await response.json();

      setData(json.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHadithList();
  }, []);

  const Item = ({ title, id }) => (
    <TouchableWithoutFeedback
      style={styles.ahadith}
      onPress={() => {
        navigation.navigate("HadithInfo", { itemid: id });
      }}
    >
      <Text
        style={{color:"#1C3634", fontSize: 12, top: 10, marginBottom: 20, marginRight:7, marginLeft: 7, }}
      >
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: 18,
                 left:-10,
                  top:20 ,
                  fontStyle: "italic",
                  color: "#19A399",
                }}
              >
                {" "}
                {title}
              </Text>
            </View>
          </>
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
};

export default HadithList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19A399",
  },
  header: {
    width: 453,
    height: 70,
    top: 80,
    backgroundColor: "#1C3634",
    alignItems: "center",
    marginBottom: 150,
  },
  ahadith: {
    backgroundColor: "#00FFEC",
    width: 355,
    
    borderRadius: 10,
    // marginLeft: 5,
    borderColor: "#1C3634",
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: 8,
  },
});
