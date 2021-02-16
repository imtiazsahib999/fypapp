/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, StatusBar, Platform, TextInput, Alert, StyleSheet, AsyncStorage} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Icon,
  Header,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {API_URL} from './constants/constans'
const App = () => {
  let [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = React.useState(false)
  const [firstName, setFirstName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  const [phone, setPhone] = React.useState(null)
  const [education, setEducation] = React.useState(null)
  const [gender, setGender] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);}
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
    

   const upDateHandle = () => {
    if (date === null || firstName === null || lastName === null ||
          phone === null || education === null || gender === null) {
         
          Alert.alert(
              'Wrong Input!',
              'Fields cannot be empty.',
              [{ text: 'Okay' }],
          );
      }
      else {
          setLoading(true)
          fetch(API_URL+'update_profile', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+token
            },
            body: JSON.stringify({
              fname: firstName,
              lname: lastName,
              phone: phone,
              education: education,
              gender: gender,
              dob: date
            })
          })
    
            .then((response) => response.json())
            .then((responseData) => {
              
             if(responseData.message === 'User Info updated successfully!'){
               alert(responseData.message)
             }else{
               alert('User not updated')
             }

                                     
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
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: '100%',
      }}>
      <StatusBar barStyle="dark-content" />
      <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Text
          style={[
            styles.loginTxt,
            {
              backgroundColor: '#f2f2f2',
              width: '100%',
              textAlign: 'center',
              alignItems: 'center',
              color: '#ED553B',
              fontWeight: 'bold',
              fontSize: 18,
            },
          ]}>
          {' '}
          Update Your Profile
        </Text>
      </Header>

      <Form style={styles.form}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> First Name </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
             <TextInput placeholder="update your first name" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setFirstName(val)}
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
            <Text style={{marginLeft: '1%', fontSize: 14}}> Last Name </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
             <TextInput placeholder="update your last name" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setLastName(val)}
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
            <Text style={{marginLeft: '1%', fontSize: 14}}> Phone </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
             <TextInput placeholder="udpate your phone no" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setPhone(val)}
                />
              <Icon active name="phone" type="Entypo" style={{fontSize: 18}} />
            </Item>
          </View>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> Education </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="updat your educatoin" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setEducation(val)}
                />
              <Icon
                active
                name="book"
                type="FontAwesome5"
                style={{fontSize: 18}}
              />
            </Item>
          </View>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> Gender </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
             <TextInput placeholder="update your first gender" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setGender(val)}
                />
              <Icon
                active
                name="human-male-female"
                type="MaterialCommunityIcons"
                style={{fontSize: 18}}
              />
            </Item>
          </View>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> DoB </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput
                placeholder=""
                style={{height: 40}}
                value={date.toString().slice(0, 15)}
                onTouchStart={() => setShow(true)}
              />

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <Icon
                active
                name="calendar-alt"
                type="FontAwesome5"
                style={{fontSize: 18}}
              />
            </Item>
          </View>
          <Button danger={true} 
            onPress={() => upDateHandle()}
            style={styles.btns} rounded>
              <Text>Update</Text>
            </Button>
        </KeyboardAwareScrollView>
      </Form>

     
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '87%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '5%',
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
    marginVertical: '5%',
  },
  form: {
    height: '90%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  inputOuter: {
    marginLeft: '2%',
    marginTop: 15,
  },
});

export default App;
