import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-native-elements';
import List from './List';






const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState([]);
  const [monthhijri, setMonth] = useState([]);
  const [abhijri, setAb] = useState([]);
  const getDate = async () => {
    try {
      const response = await fetch("http://api.aladhan.com/v1/gToH");

      const json = await response.json();

      setDate(json.data.hijri);
      setMonth(json.data.hijri.month.en)
      setAb(json.data.hijri.designation.abbreviated)


    } catch (error) {
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getDate();
  }, []);

  let hijrimonth = monthhijri;
  let hijriDay = date.day;
  let hijriYear = date.year;
  let hijriAb = abhijri
  let hijriDate = hijrimonth + " " + hijriDay + " " + hijriYear + " " + hijriAb;
  return (

    <View style={styles.container}>

      <Text style={{ position: 'absolute', width: 225, height: 24, left: 240, top: 55, fontSize: 20, lineHeight: 24, color: '#ffffff' }}>
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ


      </Text>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, position: 'absolute', width: 243, height: 114, left: 21, top: 100 }}>
        <Text style={{ width: 159, height: 29, fontSize: 24, fontWeight: "400", lineHeight: 29, flex: 'none', order: 0, flexGrow: 0 }}>
          السلام عليكم
        </Text>
        <Text style={{ width: 243, height: 49, fontWeight: '400', fontSize: 16, lineHeight: 19, flex: 'none', order: 1, flexGrow: 0, top: 30 }}>
          {isLoading ? <ActivityIndicator /> :

            hijriDate}
        </Text>
      </View>
      <View >

        <Card containerStyle={styles.hadith}>

          <Card.Title  >
            Hadith Of The Day
          </Card.Title>
          <View></View>
          <Text>
            text goes here
          </Text>

        </Card>
      </View>
      <Text style={styles.quran}>
        Quran recitation of the Day: Minshawi Al-Asr
      </Text>

      <StatusBar style="auto" />

    </View >
  );

}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#94b8f7',

  },
  hadith: {

    backgroundColor: '#A5E1F4',
    height: 231,
    width: 343,
    marginTop: 250,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,





  }
  ,
  quran: {
    width: 315,
    height: 18,
    alignSelf: 'center',
    top: 40
  }

});