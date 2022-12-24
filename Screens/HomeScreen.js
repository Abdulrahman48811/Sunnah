import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { Card } from 'react-native-elements';
import { Audio } from 'expo-av';

import List from './List';






const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState([]);
  const [monthhijri, setMonth] = useState([]);
  const [abhijri, setAb] = useState([]);
  const [audio, SetAudio] = useState([]);
  const [sound, setSound] = React.useState();
  const [Play, setPlay] = useState('play');
  const [playAudio, setPlayAudio] = useState(false);



  const getAudio = async () => {
    try {
      const response = await fetch("https://api.quran.com/api/v4/chapter_recitations/9?language=en");

      const json = await response.json();
      SetAudio(json.audio_files[96].audio_url);



    } catch (error) {
    } finally {
      setLoading(false);
    }
  }


  // const playSound= async () => {
  //     const url =
  //       'https://download.quranicaudio.com/qdc/siddiq_minshawi/murattal/103.mp3';
  //     console.log('Loading Sound');
  //     const { sound } = await Audio.Sound.createAsync(url);
  //     setSound(sound);
  //     console.log('Playing Sound');
  //     await sound.playAsync();


  //   }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

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
    getAudio();
  }, []);
  let quranAudio = audio;
  let hijrimonth = monthhijri;
  let hijriDay = date.day;
  let hijriYear = date.year;
  let hijriAb = abhijri
  let hijriDate = hijrimonth + " " + hijriDay + " " + hijriYear + " " + hijriAb;


  let status = Play;
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
      <View style={styles.audio}>

        <View style={{ top: 17, left: 35 }}>

          <Icon

            name={status}
            type='font-awesome'
            color='black'
            style={{ width: 20, height: 26.3 }}
            onPress={async () => {
              if (!playAudio) {
                await Audio.Sound.createAsync(
                  { uri: audio },
                  { shouldPlay: 'true' },





                );
                console.log(durationMillis);
                setPlay('pause');
                setPlayAudio(true);
              }
              else {

                setPlay('play');
                setPlayAudio(false)
                

              }
            }
            }



          />

        </View>
      </View>

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
  ,
  audio: {
    position: 'absolute',
    width: 330,
    height: 60,
    left: 50,
    top: 640,
    backgroundColor: '#d9d9d9',
    borderRadius: 15,


  },


});