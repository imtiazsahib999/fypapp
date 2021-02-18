/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  key,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {API_URL} from './constants/constans'

const Tab = createBottomTabNavigator();

const App = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);
  const [token, setToken] = React.useState(null)
  const [serviceArray, setServiceArray] = React.useState([token])

  React.useEffect(() =>  {
    alert(token)
    _getUserData()
    getAllService()
 
 }, [])

_getUserData = async () =>{
    let data = await AsyncStorage.getItem('User')
    let mdata = JSON.parse(data)
    if(data != null){
      let currentUser = mdata
      setToken(currentUser.token)
    }
  }
  const getAllService = () => {
    fetch(API_URL + 'service' , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
    })

        .then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson))
          console.log(responseJson.services)
            if(responseJson.status === 'success'){
              console.log(responseJson)
              setServiceArray(responseJson.services)
            }else if (responseJson.status === 'Authorization Token not found'){
              alert('Authorization Token not found')
            }
        })

        .catch((error) => {
          alert(error)
        })
}



  return (
    <Container
      style={{
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
      }}>
      {show && (
        <Animatable.View
          style={{
            height: '18%',
            position: 'absolute',
            zIndex: 9,
            width: '25%',
            top: '4%',
            marginLeft: '40%',
          }}
          animation="lightSpeedIn">
          <Item
            rounded
            style={{
              width: '100%',
              backgroundColor: 'lightgray',
              color: 'white',
            }}>
            <Input placeholder="Search..." />
          </Item>
        </Animatable.View>
      )}
      <View
        style={{
          height: '15%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('./assets/2.jpg')}
            style={{height: '35%', width: '20%', borderRadius: 50}}
          />
          <Text style={{marginLeft: '4%', fontSize: 20, fontWeight: 'bold'}}>
            Services
          </Text>
        </View>

        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '3%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Icon active name="search" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icon active name="bell" type="Entypo" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Item
          full
          style={{width: '85%', backgroundColor: 'lightgray', color: 'white'}}>
          <Input placeholder="Icon Alignment in Textbox" />
        </Item>
        <Icon
          name="menu"
          type="Entypo"
          style={{marginRight: '2%', fontSize: 40}}
        />
      </View>
      <View>
            {/* <FlatList
                data = {serviceArray}
                renderItem = {({item})=>
                <View style = {{width: '90%' ,height: 60, alignItems: 'center'}}>
                   
                   <Text> </Text>
                   <Text> </Text>
                </View>

                }
            /> */}
            
        </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '7%',
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
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default App;
