/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
import {Container, Body, Title, Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  let navigation = useNavigation();

  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: '100%',
      }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Image source={require('./assets/1.png')} />
      </View>
      <Button
        style={[styles.btns, {marginTop: '5%'}]}
        onPressIn={() => navigation.navigate('LoginScreen')}
        rounded>
        <Text style={styles.btnTxt}>Login</Text>
      </Button>
      <Button
        danger={true}
        style={styles.btns}
        onPressIn={() => navigation.navigate('Register')}
        rounded>
        <Text style={styles.btnTxt}>Become a member</Text>
      </Button>
      <Button
        warning={true}
        style={styles.btns}
        onPressIn={() => navigation.navigate('General')}
        rounded>
        <Text style={styles.btnTxt}>general person</Text>
      </Button>
      <Title style={{fontSize: 20, color: 'lightgray', marginTop: '5%'}}>
        From{' '}
      </Title>
      <Title
        style={{fontSize: 25, color: 'lightgray', textTransform: 'uppercase'}}>
        editor systima{' '}
      </Title>
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
  },
  btnTxt:{
    width: '100%', textAlign: 'center'
  }
});

export default App;
