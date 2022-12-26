import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React from 'react';

const List = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 24, right: 40, top: 20, fontStyle: 'italic', color: '#9496a1' }}> List of Hadiths</Text>
                 
            </View>

            <Text style={{fontSize:24, top:140, left: 20}}>Topics:</Text>
        </View>
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

    }

})