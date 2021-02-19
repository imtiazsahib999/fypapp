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
import Education from './component/service/education';
import Marriage from './component/service/marriage';
import Medical from './component/service/medical';
import MemberShip from './component/service/membership';
import GraveYard from './component/service/graveYard';
import Arbitration from './component/service/arbitration';
import HouseHelp from './component/service/houseHelp';
import Employment from './component/service/employment';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Youth from './component/service/youthAndIt';
import ServiceComponent from './component/serviceComponent/serviceComponent';
import Event from './component/event';
import ForgotPass from './component/forgotPass';
import AdminNav from './component/admin/adminNavigator/adminDrwerNavigtor';
import AdminLogin from './component/admin/adminLogin';
import AdminEvents from './component/admin/adminEvents';
import AdminAnnounce from './component/admin/adminAnnouncement';
import AdminBudget from './component/admin/adminBudget'
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
          name="AdminLogin"
          component={AdminLogin}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
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
          name="AdminNav"
          component={AdminNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Education"
          component={Education}
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
        <Stack.Screen
          name="ServiceComponent"
          component={ServiceComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Marriage"
          component={Marriage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HouseHelp"
          component={HouseHelp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Medical"
          component={Medical}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MemberShip"
          component={MemberShip}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Arbitration"
          component={Arbitration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Employment"
          component={Employment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Youth"
          component={Youth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GraveYard"
          component={GraveYard}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Event"
          component={Event}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminEvents"
          component={AdminEvents}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminAnnounce"
          component={AdminAnnounce}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminBudget"
          component={AdminBudget}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainApp;
