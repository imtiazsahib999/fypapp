/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, AsyncStorage, Image} from 'react-native';
import {Container, Body, Title} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const[token, setToken] = React.useState()
    let navigation = useNavigation()
    setTimeout(() => {
        navigation.navigate("Welcome")
    }, 1000);
    React.useEffect(() =>{
      // _getStoregetData()
    },[])


    // const _getStoregetData = async () => {
    //   try {
    //     const data = await AsyncStorage.getItem('User');
    //     var mdata = JSON.parse(data);
    //     if (data !== null) {
    //       let currentUser = mdata
    //       if (data.auth === true) {
            
    //         setToken(currentUser.token);
  
    //         const resetAction = StackActions.reset({
    //           index: 0,
    //           key: null,
    //           actions: [NavigationActions.navigate({ routeName: 'Nav' })],
    //         });
    //         navigation.dispatch(resetAction);
    //         // navigation.navigate('home')
  
    //       }
  
    //     } else {
  
    //       const resetAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'login' })],
    //       });
    //       navigation.dispatch(resetAction);
    //       // navigation.navigate('login')
    //     }
    //   }
    //   catch (error) {
    //     console.log("Exception =" + error);
    //   }
    // }
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
