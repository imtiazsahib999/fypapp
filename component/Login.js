/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StatusBar,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Icon,
  CheckBox,
  Header,
  Label,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {API_URL} from '../component/constants/constans';



const App = () => {
  let navigation = useNavigation();
  const [loginLoading, setLoginLoading] = React.useState(false)
    const [email, setEmail] = React.useState(null)
    const [cnic, setCnic] = React.useState(null)
    const [password, setPassword] = React.useState(null)


  const loginHandle = () => {
    if (email === null || password === null || cnic === null) {
        Alert.alert(
            'Wrong Input!',
            'Field cannot be empty.',
            [{ text: 'Okay' }],
        );
    }else {
        setLoginLoading(true)
        fetch(API_URL+'login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

          },
          body: JSON.stringify({
            email: email,
            cnic: cnic,
            password: password,
          })
        })
  
          .then((response) => response.json())
          .then((responseData) => {
            // alert(JSON.stringify(responseData))
            if(responseData.access_token && responseData.token_type){
              alert(JSON.stringify(responseData.email))
                // setUserName(responseData.user.pAds_userUsername)
                // setFullName(responseData.user.pAds_userfullName)
                // setUserId(responseData.user.pAds_userID)
                
                // let obj = {
                //     auth: true,
                //     userId: responseData.user.pAds_userID,
                //     fullName: responseData.user.pAds_userfullName,
                //     userName: responseData.user.pAds_userUsername,
                //     token: responseData.token,
                //   }
                //   _storeUser('userAuth', JSON.stringify(obj))
                //   setLoginLoading(false)

                //   const resetAction = StackActions.reset({
                //     index: 0,
                //     actions: [NavigationActions.navigate({ routeName: 'home' })],
                //   });
                //   navigation.dispatch(resetAction);      
            }else{
                alert('No data found')
                setLoginLoading(false)
            }
                      
          })
          .catch((error) => {
              alert(error)
            setLoginLoading(false)
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
            },
          ]}>
          {' '}
          Login
        </Text>
      </Header>
      {/* <Text style={styles.loginTxt}>Login</Text> */}

      <Image
        source={require('./assets/1.png')}
        style={{height: '25%', width: '25%', marginTop: '2%'}}
      />
      <Form style={styles.form}>
        <KeyboardAwareScrollView>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> Member ID </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                marginTop: '5%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setCnic(val)}
               />
              <Icon active name="contacts" type="AntDesign" />
            </Item>
          </View>

          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> Passsword </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                marginTop: '5%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter your password" 
               style={{height: 40, width: '90%'}}
              secureTextEntry={true}
              onChangeText={(val)=> setPassword(val)}
              />
              <Icon active name="lock-closed" type="Ionicons" />
            </Item>
          </View>

          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              Email{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter your email" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setEmail(val)}/>
              <Icon active name="mail" type="Octicons" />
            </Item>
          </View>

          <View
            style={[
              styles.inputOuter,
              {
                marginTop: '10%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CheckBox checked={false} style={{height: 15, width: 15}} />
              <Text style={{fontSize: 16, marginLeft: '10%'}}>Remember Me</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginLeft: '4%'}}>
                Forgot Password?
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Form>

      <Button
        danger={true}
        style={styles.btns}
        rounded
        active={true}
        onPressIn={() => loginHandle()
        // navigation.navigate('Nav')
        }>
        <Text style={styles.btnTxt}>login</Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
  },
  loginTxt: {
    color: 'red',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  form: {
    // borderWidth: 1,
    height: '40%',
    width: '95%',
    marginTop: '10%',
    borderRadius: 20,
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
  },
  inputOuter: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: '5%',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
  },
});

export default App;
