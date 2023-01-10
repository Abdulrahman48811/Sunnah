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
        style={{ fontSize: 12, alignSelf: "center", top: 10, marginBottom: 20 }}
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
                  fontSize: 20,
                  right: 40,
                  top: 24,
                  fontStyle: "italic",
                  color: "#197784",
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
    backgroundColor: "#197784",
  },
  header: {
    width: 493,
    height: 70,
    top: 80,
    backgroundColor: "#4B4874",
    alignItems: "center",
  },
  ahadith: {
    backgroundColor: "#227DA4",
    width: 349,
    height: 130,
    borderRadius: 22,
    top:150,
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: 8,
  },
});
