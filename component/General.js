/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
import {Container, Button, Text, Header, Body} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const App = () => {
  let navigation = useNavigation();

  return (
    <Container
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
      }}>
      <Header>
        <Text style={{backgroundColor: '#3f51b5', width: '100%'}}></Text>
      </Header>
      <Body style={{width: '100%'}}>
        <ScrollView>
          <Button
            style={styles.btns}
            rounded
            onPressIn={() => navigation.navigate('AboutUs')}>
            <Text style={styles.btnTxt}>About Us</Text>
          </Button>
          <Button
            style={styles.btns}
            rounded
            onPressIn={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnTxt}>Our Services</Text>
          </Button>
          <Button
            style={styles.btns}
            rounded
            onPressIn={() => navigation.navigate('Announcements')}>
            <Text style={styles.btnTxt}>Announcement and Events</Text>
          </Button>
          <Button
            style={styles.btns}
            rounded
            onPressIn={() => navigation.navigate('DonateUs')}>
            <Text style={styles.btnTxt}>Donate Us</Text>
          </Button>
          <Text style={{fontSize: 18, color: 'gray', marginTop: '10%'}}>
            From{' '}
          </Text>
          <Text
            style={{fontSize: 20, color: 'gray', textTransform: 'uppercase'}}>
            editor systima{' '}
          </Text>
        </ScrollView>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '10%',
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  form: {
    height: '75%',
    width: '95%',
    marginTop: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  inputOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
  },
});

export default App;
