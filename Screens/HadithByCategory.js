import { StyleSheet, Text, View, ActivityIndicator, Button, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import { TouchableOpacity } from 'react-native';



const HadithList = (id) => {
    const HadithID = id.route.params.HadithID;
    const title = id.route.params.category
    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState();
    const getHadithList = async () => {

        try {
            const response = await fetch(
                `https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=${HadithID}&page=1&per_page=100`
            );

            const json = await response.json();

            setData(json.data);
            console.log(data[0].title )
            
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHadithList();
    }, []);


    
    

    return (


        <View style={styles.container}>
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
          {title}
        </Text>
      </View>
      <Text></Text>
        </View>
    )
}

export default HadithList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7d6c82",
    }, 
    header: {
        width: 493,
        height: 70,
        top: 80,
        backgroundColor: "#5d5f66",
        alignItems: "center",
      },
});
