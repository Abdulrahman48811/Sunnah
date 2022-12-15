import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
       <Text style={styles.header}>
        Bismillah
       </Text>
      <StatusBar style="auto" />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#94b0f7',
  
  },
  header: {
    flex:1 ,
    position:'absolute',
    alignItems:'center',
    marginTop:10,
  }
});