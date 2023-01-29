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
       <View style={{right:180, top:50, }}>
      <Icon name="star" color="#B08C8C" style={{height:29}} />
      </View>
      
      <View style={{ width: 350,  top: 113, left: 40 }}>
        <Text style={{ fontSize: 15 , color:'white'}}> {dataar.hadeeth}</Text>
        <Text style={{top:15 ,color:'orange'}}> {dataar.attribution} </Text>
        
      </View>

      <View style={{ top: 175, left: 40, width: 350  }}>
        <Text style={{ fontSize: 15, color:'white' }}>{dataen.hadeeth}</Text>
        {/* <Text style={{top:8}}>{dataen.grade}</Text> */}
      </View>
      <View style={{left:40, top:225 }}>
        <Text style={{fontSize:25 , color:'#DCA6A6'}}>
           Hadith Explanation:
        </Text>
        <Text style={{width:350, color:'white'}}>
            {dataen.explanation}
        </Text>
        <Icon reverse  name="bookmark" type="font-awesome" size={25}/>
        <Text style={{top:15, color:'#a8a3b5'}}>
            Refrence:
        </Text>
        <Text style={{top:30, width:350, color:'white', fontSize:8}}>
            
            {dataar.reference}
        </Text>

        <View style={{top:170, left:140}}>
           <Text style={{color:"#976C69"}}>App Name</Text>
        </View>
      </View>

    
    </ScrollView>
  );
};
export default HadithInfo;
const styles = StyleSheet.create({
  container: {
    
   
    backgroundColor: "#7B5A58",
  },
});
