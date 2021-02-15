/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  key,
  AsyncStorage
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Screen1 from './MyServices1';
import Screen2 from './MyServices2';
import Education from './service/education';
import {API_URL} from '../component/constants/constans'

const Tab = createBottomTabNavigator();

const App = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);
  const [token, setToken] = React.useState()
  const [array, setArray] = React.useState([])

  useEffect(() =>  {
   
   _getUserData()
    getCategories()

}, [])

_getUserData = async () =>{
  let data = await AsyncStorage.getItem('User')
  let mdata = JSON.parse(data)
  if(data != null){
    let currentUser = mdata
    setToken(currentUser.token)
  }
}

const getCategories = () =>{
    fetch(API_URL + 'service' ,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
    })

        .then((response) => response.json())
        .then((responseJson) => {
          alert(JSON.stringify(responseJson))
          console.log(responseJson)
          // alert(JSON.stringify(responseJson))
            // responseJson.sort((a, b) => {
            //     if(a.title > b.title){
            //         return 1
            //     } else if(b.title > a.title){
            //         return -1
            //     } else {
            //         return 0
            //     }
            // })
            // console.log(arr, 'sort');
            setArray(responseJson)
            // getBooks(0,null,responseJson[0].id)
            // setCatId(responseJson[0].id)
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
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
            <FlatList
            data = {array}
            // key={morebookArray}
            keyExtractor={item => item.id.toString()}
            // extraData={morebookArray}
            // refreshing={refreshing}
            // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            renderItem = {({item})=>
                <TouchableOpacity 
                style={{width:'100%'}}
                onPress ={() => navigation.navigate('',{
              
                })}
                />
                  }
                  numColumns = {2}
            />
         
        </View>
      </ScrollView>
    </Container>
  );
};
const Services = () => {
  let [currentScreen, setCurrentScreen] = useState();
  let [show, setShow] = useState(false);
  

  return (
    <Tab.Navigator
      initialRouteName="Home3"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home2"
        component={Screen1}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '120%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Services
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}>
              <Image
                source={require('./assets/9.png')}
                style={{height: 30, width: 30}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home3"
        component={App}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(App)}>
              <Icon
                type="Ionicons"
                name="home"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Education}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                }}></Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  position: 'relative',
                  borderRadius: 50,
                  width: 60,
                  top: -25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {show && (
                  <Animatable.View
                    animation="zoomInUp"
                    style={{
                      position: 'absolute',
                      zIndex: 122,
                      top: -40,
                      flexDirection: 'row',
                      width: 120,
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      borderRadius: 25,
                      elevation: 10,
                      padding: 5,
                    }}>
                    <Icon
                      type="Zocial"
                      name="statusnet"
                      style={{fontSize: 20, color: 'black'}}
                    />
                    <Text>{'  '} Status</Text>
                  </Animatable.View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fe019a',
                    height: 50,
                    borderRadius: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setShow(!show)}>
                  <Icon
                    type="Feather"
                    name="plus"
                    style={{fontSize: 25, color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home4"
        component={Screen1}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {' '}
                Approvals
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '115%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}>
              <Icon
                type="AntDesign"
                name="checkcircleo"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home5"
        component={Screen2}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {' '}
                More
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '115%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen2)}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
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

export default Services;
