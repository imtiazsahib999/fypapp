/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import ServiceComponent from '../serviceComponent/serviceComponent';

const MemberShip = ({navigation, props}) => {


  return (
      
        <ServiceComponent screenTitle = 'Membership Community'  navigation = {navigation}>
            
        </ServiceComponent>
    
  );
};

export default MemberShip;
