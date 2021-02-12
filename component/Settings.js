import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
} from 'native-base';
import { Switch } from 'react-native-paper';
import {TouchableOpacity,View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
let ListAvatarExample = () => {
  let navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);



  return (
    <Container>
      <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Left
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon active name="arrowleft" type="AntDesign" />
          </TouchableOpacity>
          <Text>Settings</Text>
        </Left>
        <Right>
          <Icon name="poweroff" type="AntDesign" style={{fontSize: 20}} />
        </Right>
      </Header>
      <Content>
          <View style={{marginHorizontal:"5%",height:"10%",width:'90%',backgroundColor:"lightgray",marginVertical:"5%"}}></View>
          {[
           
          
            {text: 'Refresh', switch: false},
            {text: 'About (7.6.5)', switch: false},
            {text: 'Feedback', switch: false},
            
            {text: 'Help', switch: false},
            {text: 'Terms of Services', switch: false},
            {text: 'Privacy', switch: false},
          ].map((item, key) => (
            <View key={key} style={{flexDirection:'row',justifyContent:'space-between',marginTop:"8%",marginHorizontal:"4%"}}>
                <Text style={{fontSize:14}}>{item.text}</Text>
                {/* {item.switch &&
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                } */}
            </View>
          ))}
      </Content>
    </Container>
  );
};

export default ListAvatarExample;
