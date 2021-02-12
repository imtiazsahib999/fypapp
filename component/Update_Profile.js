/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Header,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const App = () => {
  let [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
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
              <Input placeholder="" style={{height: 40}} />
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
              <Input placeholder="" style={{height: 40}} />
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
              <Input placeholder="" style={{height: 40}} />
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
              <Input placeholder="" style={{height: 40}} />
              <Icon active name="phone" type="Entypo" style={{fontSize: 18}} />
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
              <Input placeholder="" style={{height: 40}} />
              <Icon active name="mail" type="Octicons" style={{fontSize: 18}} />
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
              <Input placeholder="" style={{height: 40}} />
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
              <Input placeholder="" style={{height: 40}} />
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
              <Input
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
          <Button danger={true} style={styles.btns} rounded>
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
