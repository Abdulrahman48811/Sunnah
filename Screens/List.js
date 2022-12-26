import { StyleSheet, Text, View, ActivityIndicator, Button, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';



const List = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([])


    const getTitle = async () => {
        try {
            const response = await fetch("https://hadeethenc.com/api/v1/categories/list/?language=en");

            const json = await response.json();

            setData(json)




        } catch (error) {
        } finally {
            setLoading(false);
        }

    }
  
        const Item = ({ title}) => (
            <View style={styles.item}>
                <Text style={styles.title} >{title}</Text>
            </View>
        );
        
        const renderItem = ({item}) => (
            <Item  title={item.title} />
        )

    useEffect(() => {
        getTitle();
    }, []);

    return (
        
            <ScrollView  style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 24, right: 40, top: 20, fontStyle: 'italic', color: '#9496a1' }}> List of Hadiths</Text>

            </View>

            <Text style={{ fontSize: 24, top: 140, left: 20 }}>Topics:</Text>

            <View>
                <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
            </View>
            </ScrollView>
        
    )
}
export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8e8f91',

    },
    header: {
        width: 493,
        height: 70,
        top: 80,
        backgroundColor: '#5d5f66',
        alignItems: 'center'

    },
    item: {
        backgroundColor: '#a1a2ab',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        top:150
      },
      title: {
        fontSize: 15,
      }
})