import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card, LinearProgress } from 'react-native-elements';
export default function App() {
  return (
    <View style={styles.container}>

      <Text style={{ position:'absolute', width:225, height:24, left:240, top:55,fontSize:20, lineHeight:24, color:'#ffffff' }}>
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ


      </Text>
        <View style={{display:'flex', flexDirection:'column',alignItems:'flex-start', padding:0, position:'absolute', width:243, height:114, left:21, top:100}}>
      <Text style={{width: 159, height:29,fontSize:24, fontWeight:"400", lineHeight:29, flex:'none', order:0, flexGrow:0}}>
        السلام عليكم
      </Text>
      <Text style={{width:243, height:49, fontWeight:'400', fontSize:16,lineHeight:19 ,flex:'none',order:1, flexGrow:0, top:30}}>
      rabi’ I 10, 1444 AH
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