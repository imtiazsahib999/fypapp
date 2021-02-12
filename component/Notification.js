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
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
let ListAvatarExample = () => {
  let navigation = useNavigation();
  return (
    <Container>
      <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon active name="arrowleft" type="AntDesign" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>Notifications</Text>
        </Body>
      </Header>
      <Content>
        <List>
          {[1, 2, 3, 4, 5, 6, 7].map((item, key) => (
            <ListItem avatar key={key}>
              <Left>
                <Thumbnail source={require('./assets/2.jpg')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default ListAvatarExample;
