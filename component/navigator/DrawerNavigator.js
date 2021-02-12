import * as React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MyServices from '../MyServices';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

export default function RouteNav() {
  return (
    <Drawer.Navigator initialRouteName="MyServices" drawerPosition="right"  drawerContent={(props) => <DrawerContent {...props}  />}>
      <Drawer.Screen
        name="MyServices"
        component={MyServices}
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
