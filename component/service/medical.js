/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import ServiceComponent from  '../serviceComponent/serviceComponent';

const Medical = ({navigation, props}) => {


  return (
      
        <ServiceComponent screenTitle = 'Medical'  navigation = {navigation}>
            
        </ServiceComponent>
    
  );
};

export default Medical;
