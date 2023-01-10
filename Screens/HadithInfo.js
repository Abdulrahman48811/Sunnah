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
const HadithInfo = (id) => {
  const [dataen, setdataen] = useState([]);
  const [dataar, setdataar] = useState([]);
  const HadithID = id.route.params.itemid;
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
  }, []);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:400}}
    >
      <View style={{ width: 350,  top: 133, left: 40 }}>
        <Text style={{ fontSize: 15 }}> {dataar.hadeeth}</Text>
        <Text style={{top:15}}> {dataar.attribution}</Text>
      </View>

      <View style={{ top: 190, left: 40, width: 350 }}>
        <Text style={{ fontSize: 15 }}>{dataen.hadeeth}</Text>
      </View>
      <View style={{left:40, top:250 }}>
        <Text style={{fontSize:25 , color:'white'}}>
           Hadith Explanation:
        </Text>
        <Text style={{width:350}}>
            {dataen.explanation}
        </Text>
        <Text style={{top:40, color:'white'}}>
            Refrence:
        </Text>
        <Text style={{top:50, width:350}}>
            
            {dataar.reference}
        </Text>
      </View>

    
    </ScrollView>
  );
};
export default HadithInfo;
const styles = StyleSheet.create({
  container: {
    
   
    backgroundColor: "#6181D2",
  },
});
