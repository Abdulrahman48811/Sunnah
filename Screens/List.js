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
import HadithList from "./HadithByCategory";

const List = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTitle = async () => {
    try {
      const response = await fetch(
        "https://hadeethenc.com/api/v1/categories/list/?language=en"
      );

      const json = await response.json();

      setData(json);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const Item = ({ title, id }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        console.log(id);
      }}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 24,
            right: 40,
            top: 20,
            fontStyle: "italic",
            color: "#9496a1",
          }}
        >
          {" "}
          List of Hadiths
        </Text>
      </View>

      <Text style={{ fontSize: 24, top: 140, left: 20 }}>Topics:</Text>

      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ top: 150 }}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </View>
    </ScrollView>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8e8f91",
  },
  header: {
    width: 493,
    height: 70,
    top: 80,
    backgroundColor: "#5d5f66",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#a1a2ab",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
});
