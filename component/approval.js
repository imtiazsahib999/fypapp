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
  StyleSheet,
  TextInput,
  ScrollView,
  key,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {Container, Text, Icon, Item, Form, Button, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {API_URL} from './constants/constans'
const Tab = createBottomTabNavigator();

const Approval = () => {
  let navigation = useNavigation();
  let [show, setShow] = useState(false);
  const [loading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState(null)
  const [attachment, setAttachment] = React.useState(null)
  const [description, setDescription] = React.useState(null)
  const [token, setToken] = React.useState()

  React.useEffect(() =>  {
   
    _getUserData()
 
 }, [])

_getUserData = async () =>{
    let data = await AsyncStorage.getItem('User')
    let mdata = JSON.parse(data)
    if(data != null){
      let currentUser = mdata
      setToken(currentUser.token)
    }
  }
  const specificServiceHandle = () => {

    if (title === null || attachment === null || description === null ) {
       
        Alert.alert(
            'Wrong Input!',
            'Fields cannot be empty.',
            [{ text: 'Okay' }],
        );
    }
    else {
        setLoading(true)
        fetch(API_URL + 'service/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
          },
          body: JSON.stringify({
            services: title,
            form_object: description,
            attachments: attachment
            
          })
        })
  
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData)
              alert(JSON.stringify(responseData))
              // if (responseData.message === 'Request Successfully Saved!'){ 
              //     alert('Request Successfully Saved!')
              // }else {
              //   alert('Check the fields')
              // }  
                      
          })
          
          .catch((error) => {
            alert(error)
            setLoading(false)
          })
    }

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
   
      <Form style={styles.form}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}>Title </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter your title" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setTitle(val)}
                />
                <Icon
                  active
                  name="account"
                  type="MaterialCommunityIcons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}>Description</Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter Description" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setDescription(val)}
                
                />
                <Icon
                  active
                  name="contacts"
                  type="AntDesign"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            
           
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Attachment </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter attachment" style={{height: 40, width: '90%'}}
                onChangeText={(val)=> setAttachment(val)}
                
                />
                <Icon
                  active
                  name="mail"
                  type="Octicons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            
            <Button danger={true} 
            onPress={() => specificServiceHandle()}
            style={styles.btns} rounded>
              <Text>Submit</Text>
            </Button>
            </KeyboardAwareScrollView>
        </Form>
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
    marginLeft: '2%',
    marginTop: 15,
  },
  form: {
    height: '90%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default Approval;
