/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {Container, Body, Title} from 'native-base';
import App from './component/splashScreen';
import Welcome from './component/WelcomeScreen';
import LoginScreen from './component/Login';
import Register from './component/Register';
import General from './component/General';
import MyServices from './component/MyServices';
import Notification from './component/Notification';
import AboutUs from './component/AboutUs';
import Announcements from './component/Announcements';
import DonateUs from './component/DonateUs';
import OurServices from './component/OurServices';
import Settings from './component/Settings';
import Update_Profile from './component/Update_Profile';
import Nav from './component/navigator/DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={App}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="General"
          component={General}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Announcements"
          component={Announcements}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DonateUs"
          component={DonateUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OurServices"
          component={OurServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Update_Profile"
          component={Update_Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainApp;
