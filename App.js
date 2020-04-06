import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Root from './src/Navigations/index';


export default function App() {
  return (
    
    <View style={{flex:1}}>
      <Root/>
    </View>
 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
