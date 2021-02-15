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
import {NavigationActions, StackActions} from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {API_URL} from '../component/constants/constans'; 

const App = (navigation, props) => {
  let [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = React.useState(false)
  const [firstName, setFirstName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [phone, setPhone] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [cnic, setCnic] = React.useState(null)
  const [education, setEducation] = React.useState(null)
  const [gender, setGender] = React.useState(null)
  const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const signUpHandle = () => {

    if (date === null || firstName === null || lastName === null || password === null ||
        phone === null || email === null || cnic === null || education === null || gender === null) {
       
        Alert.alert(
            'Wrong Input!',
            'Fields cannot be empty.',
            [{ text: 'Okay' }],
        );
    }
    else {
        setLoading(true)
        fetch(API_URL+'signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fname: firstName,
            lname: lastName,
            email: email,
            cnic: cnic,
            phone: phone,
            password: password,
            education: education,
            gender: gender,
            dob: date
          })
        })
  
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData)
              setLoading(false)
              if (responseData.message === 'The given data was invalid.'){ 
                  alert(JSON.stringify(responseData.errors.email))
              }else {
                   let user = {
                     auth: true,
                     token: responseData.access_token,
                     token_type: responseData.token_type
                     
                   }
                   console.log(user)
                   AsyncStorage.setItem("User", JSON.stringify(user))
          //          const resetAction = StackActions.reset({
          //               index: 0,
          //               actions: [NavigationActions.navigate({ routeName: 'Nav' })],
          //             });
          //             props.navigation.dispatch(resetAction); 
                   navigation.navigate('Nav')
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
            backgroundColor: '#fff',
          }}>
          <Text
            style={[
              styles.loginTxt,
              {
                backgroundColor: '#fff',
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                color: '#ED553B',
                fontWeight: 'bold',
                fontSize: 18,
              },
            ]}>
            {' '}
            Become a member
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
                <TextInput placeholder="Enter your first name" style={{height: 40, width: '90%'}} 
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
                <TextInput placeholder="Enter your last name" style={{height: 40, width: '90%'}}
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
              <Text style={{marginLeft: '1%', fontSize: 14}}> Member ID </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter your cnic" style={{height: 40, width: '90%'}} 
                onChangeText={(val)=> setCnic(val)}
                
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
              <Text style={{marginLeft: '1%', fontSize: 14}}> Phone </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter your phone no" style={{height: 40, width: '90%'}}
                onChangeText={(val)=> setPhone(val)}
                
                />
                <Icon
                  active
                  name="phone"
                  type="Entypo"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Password </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter your password" 
                secureTextEntry={true}
                style={{height: 40, width: '90%'}}
                onChangeText={(val)=> setPassword(val)}
                
                />
                <Icon
                  active
                  name="lock-closed"
                  type="Ionicons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Email </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <TextInput placeholder="Enter your email" style={{height: 40, width: '90%'}}
                onChangeText={(val)=> setEmail(val)}
                
                />
                <Icon
                  active
                  name="mail"
                  type="Octicons"
                  style={{fontSize: 18}}
                />
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
                <TextInput placeholder="Enter your education" style={{height: 40, width: '90%'}} 
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
                <TextInput placeholder="Enter your gender" style={{height: 40, width: '90%'}} 
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
                  style={{height: 40, width: '90%'}}
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
                  style={{fontSize: 18, width: '90%'}}
                />
              </Item>
            </View>
            <Button danger={true} 
            onPress={() => signUpHandle()}
            style={styles.btns} rounded>
              <Text>Register</Text>
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
    marginVertical: '5%',
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
