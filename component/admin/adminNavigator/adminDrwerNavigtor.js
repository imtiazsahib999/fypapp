import * as React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Admindashboard from '../adminDashboard';
import AdDrawerContent from './admDrwerContant';
const Drawer = createDrawerNavigator();

export default function RouteNav1() {
  return (
    <Drawer.Navigator initialRouteName="Admindashboard" drawerPosition="right" 
     drawerContent={(props) => <AdDrawerContent {...props}  />}>
      <Drawer.Screen name="Admindashboard"component={Admindashboard}
        options={{
          // drawerIcon: ({focused, color, size}) => (
          //   <Image
          //     source={require('../../asset/Images/icon_dashboard.png')}
          //     style={{marginLeft: 2}}
          //   />
          // ),
          drawerLabel: ({focused, color}) => (
            <Text style={{color: 'black'}}>Dashboard</Text>
          ),
          unmountOnBlur: () => true,
        }}
      />
    </Drawer.Navigator>
  );
}