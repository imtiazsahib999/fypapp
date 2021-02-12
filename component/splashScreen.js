/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Image} from 'react-native';
import {Container, Body, Title} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const App = () => {
    let navigation = useNavigation()
    setTimeout(() => {
        navigation.navigate("Welcome")
    }, 1000);
  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height: '100%',
      }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Image source={require('./assets/1.png')} />
      </View>
      <Title style={{fontSize: 20, color: 'lightgray', marginTop: '5%'}}>
        From{' '}
      </Title>
      <Title style={{fontSize: 25, color: 'lightgray',textTransform:'uppercase'}}>Editor Systima </Title>
    </Container>
  );
};

export default App;
