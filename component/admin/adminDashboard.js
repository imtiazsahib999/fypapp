import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  key,
  TouchableOpacity,
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Screen1 from '../MyServices1';
import Screen2 from '../MyServices2';

const Tab = createBottomTabNavigator();

const App = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);
  

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
            source={require('../assets/2.jpg')}
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
            <View
          style={{
           backgroundColor:'red',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
        </View>
          <TouchableOpacity  onPress = {() => navigation.navigate('AdminAnnounce')}
          style={{width: '40%', }}>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/3.png')}
                style={{height: 50, width: 30}}
              />
            </CardItem> 
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Announcements</Text>
             </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => navigation.navigate('AdminEvents')}
           style={{width: '40%',  marginLeft: '3%'}}>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/4.png')}
                style={{height: 40, width: 40}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Admin Events</Text>
            </CardItem>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity onPress = {() => navigation.navigate('AdminBudget')}
           style={{width: '40%',marginLeft:'2%'}}>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/7.png')}
                style={{height: 40, width: 40}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Budgets</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => navigation.navigate('')}
           style={{width: '40%', marginLeft: '3%'}}>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/5.png')}
                style={{height: 40, width: 40}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Services</Text>
            </CardItem>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity onPress = {() => navigation.navigate('')}
          style={{width: '40%'}}>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/8.png')}
                style={{height: 40, width: 40}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>All users</Text>
            </CardItem>
          </TouchableOpacity>
         
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
                source={require('../assets/9.png')}
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
        component={() => <Text></Text>}
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