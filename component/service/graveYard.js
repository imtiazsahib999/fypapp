/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
 
import ServiceComponent from '../serviceComponent/serviceComponent';

const GraveYard = ({navigation, props}) => {

  return (
      
        <ServiceComponent screenTitle = 'Grave Yard'  navigation = {navigation}>
            
        </ServiceComponent>
    
  );
};

export default GraveYard;
