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
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SearchInput, { createFilter } from "react-native-search-filter";
const List = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const KEYS_TO_FILTERS = ["title"];
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
      onPress={() => {
        navigation.navigate("HadithByCategory", {
          HadithID: id,
          category: title,
          navigate: navigation,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;

  useEffect(() => {
    getTitle();
  }, []);

  const searchUpdated = (term) => {
    setSearchTerm(term);
  };
  const filtereddata = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: 24,
                  right: 40,
                  top: 20,
                  fontStyle: "italic",
                  color: "#19A399",
                }}
              >
                {" "}
                List of Hadiths
              </Text>
            </View>

            <View style={styles.searchcontainer}>
              {/* <TextInput
                placeholder="Search for hadith.."
                style={styles.inputsearch}
                value={search}
                onChangeText={(text) => searchFilter(text)}
              /> */}
              <SearchInput
                onChangeText={(term) => {
                  searchUpdated(term);
                }}
                style={styles.inputsearch}
                placeholder="Search for Hadith..."
              />
            </View>

            <Text
              style={{ fontSize: 24, top: 90, left: 20, marginBottom: 110 }}
            >
              Topics:
            </Text>
          </>
        }
        data={filtereddata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19A399",
  },
  header: {
    width: 493,
    height: 70,
    top: 80,
    backgroundColor: "#1C3634",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#246C66",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 59,
    borderColor: "blue",
  },
  title: {
    fontSize: 15,
    color:"#00FFEC"
  },
  searchcontainer: {
    margin: 15,
  },
  inputsearch: {
    backgroundColor: "#ededed",
    padding: 12,
    borderRadius: 10,
    color: "#000",
    borderWidth: 0.5,
    top: 85,
  },
});
