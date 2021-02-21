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
  View,
  Item,
  Input,
  Button
} from 'native-base';
import {TouchableOpacity, FlatList, TextInput, AsyncStorage, StyleSheet,Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {API_URL} from '../constants/constans';

 



const App = ({navigation, ...props}) => {
    const [loginLoading, setLoginLoading] = React.useState(false)
    const [token, setToken] = React.useState(null)
    const [serviceArray, setServiceArray] = React.useState([])
   



    React.useEffect(() =>  {
       
        _getUserData()
        getService()
        
        
     }, [])
    
  const  _getUserData = async () =>{
        let data = await AsyncStorage.getItem('User')
        let mdata = JSON.parse(data)
        if(data != null){
          let currentUser = mdata
          setToken(currentUser.token)
        }
      }

    const getService = () =>{
        fetch(API_URL + 'getuser/all',{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ token
            },
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            console.log(responseJson)
            setServiceArray(responseJson)
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
        <Text>All User</Text>
      </Body>
    </Header>
      <FlatList
        style={{flex:1}}
          data={serviceArray}
          key={item => item.id}
          renderItem={ ({item}) => 
              <View style={styles.container}>
              <View style={{width:'80%',marginLeft:20}}>
              <Text style={styles.title}>CNIC:   {item.cnic}</Text>
              <Text style={styles.title}>Education:   {item.education}</Text>
              <Text style={styles.title}>Email:   {item.email}</Text>
              <Text style={styles.title}>F Name:   {item.fname}</Text>
              <Text style={styles.title}>L Name:   {item.lname}</Text>
              <Text style={styles.title}>Gender:   {item.gender}</Text>
             <Text style={styles.title}>Status: {item.status}</Text>


              </View>
             </View>
          }
          keyExtractor={(item) => item.id.toString()}

        />
        
            </Container>
);
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    borderRadius : 10,
    width: '90%',
    borderWidth: 1,
    borderColor: 'rgba(161,155,183,1)',
      margin:10,
      paddingHorizontal:10,
      paddingVertical:10,
      flexDirection:'row'
  },
  title: {
      fontSize:12,
      color:'gray'
  },
  modalBody:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:5,
    padding:10,
    alignItems:'center'
  },
  modalContainer:{
    height:500,
    width:300,
    backgroundColor:'#fff',
    borderRadius:15,
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center'
  },
  modalContainerDel:{
    height:150,
    width:300,
    backgroundColor:'#fff',
    borderRadius:15,
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center'
  },
  btns: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
  }
});

export default App;
