import React from 'react';
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
import {TouchableOpacity, View, FlatList, StyleSheet, AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from './constants/constans';
const  Announcement = () => {
  const [announceArray, setAnnounceArray] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [token, setToken] = React.useState('')


  let navigation = useNavigation();


  React.useEffect(() =>  {
    
     _getUserData(token)
    getAnnounement()
  }, [])

 _getUserData = async () =>{
     let data = await AsyncStorage.getItem('User')
     let mdata = JSON.parse(data)
     if(data != null){
       let currentUser = mdata
       setToken(currentUser.token)
     }
   }

   const getAnnounement = () => {
    fetch(API_URL + 'announcement' , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
    })

        .then((response) => response.json())
        .then((responseJson) => {
          // alert(JSON.stringify(responseJson))
          console.log(responseJson)
              setAnnounceArray(responseJson)
            
        })

        .catch((error) => {
          alert(error)
        })
}
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
          <Text>Announcements</Text>
        </Body>
        </Header>
        <FlatList
          style={{flex:1}}
            data={announceArray}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                <View style={{width:'90%'}}>
                <Text style={[styles.title,{fontWeight: 'bold'}]}> {item.title}</Text>
                    <Text style={[styles.title,{fontSize: 14}]}> {item.description}</Text>
                  <Text style={[styles.title, {fontSize: 12}]}> Date : {item.expiry}</Text>
                </View>
                
                <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                
                </View>
            </View>
            }
            keyExtractor={(item) => item.id.toString()}

          />
     
    </Container>
  );
};

export default Announcement;
const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    alignSelf:'center',
    borderRadius : 10,
    width: '90%',
    borderWidth: 1,
      margin:10,
      paddingHorizontal:10,
      paddingVertical:10,
      flexDirection:'row'
  },
  title: {
      fontSize:16,
      color:'gray'
  },
})