import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen';


export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.head}>Barter App</Text>
        <SignupLoginScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    fontSize: 35
  }
});

