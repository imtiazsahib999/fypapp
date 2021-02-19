/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, StatusBar, Platform, TextInput, Alert, StyleSheet, AsyncStorage } from 'react-native';
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

const App = ({navigation, ...props}) => {
    let [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState(null)
  const [description, setDescription] = React.useState(null)
  const [token, setToken] = React.useState(null)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

   React.useEffect(() =>  {
       alert(token)
        _getUserData(token)
     
     }, [])

    _getUserData = async () =>{
        let data = await AsyncStorage.getItem('User')
        let mdata = JSON.parse(data)
        if(data != null){
          let currentUser = mdata
          setToken(currentUser.token)
        }
      }
   

    const eventHandle = () => {
        if (title === null ||  description === null || date === null) {
           
            Alert.alert(
                'Wrong Input!',
                'Fields cannot be empty.',
                [{ text: 'Okay' }],
            );
        }
        else {
            setLoading(true)
            fetch('https://react.codupcloud.com/api/event' , {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
              },
              body: JSON.stringify({
                title: title,
                description: description,
                expiry: date
                
              })
            })
      
              .then((response) => response.json())
              .then((responseData) => {
                // console.log(responseData)
                if(responseData.status === 'Success'){
                  alert(JSON.stringify(responseData.message))
                }else{
                    alert(JSON.stringify(responseData.message))
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
          Admin Event
          </Text>
        </Header>

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
                <TextInput placeholder="Title" style={{height: 40, width: '90%'}} 
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
                <TextInput placeholder="Description" style={{height: 40, width: '90%'}} 
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
              <Text style={{marginLeft: '1%', fontSize: 14}}>Expiry Date</Text>
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
            onPress={() => eventHandle()}
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
