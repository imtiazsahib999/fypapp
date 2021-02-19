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
import {TouchableOpacity, FlatList, AsyncStorage, StyleSheet,Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {API_URL} from '../constants/constans';

const ListAvatarExample = () => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  let [show, setShow] = React.useState(false);
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [title, settitle] = React.useState('');
  const [description, setdescription] = React.useState('');
  const [modalDel, setModalDel] = React.useState(false);
  const [modalDel2, setModalDel2] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');
  const [token, setToken] = React.useState('')
  const [announceArray, setAnnounceArray] = React.useState([])
  const [loading, setLoading] = React.useState(false)  
  const [announceId, setAnnounceId] = React.useState('')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  React.useEffect(() =>  {
    // alert(token)
    _getUserData()
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

    const addService = () => {

            if (date === null || title === null || description === null ) {
               
                Alert.alert(
                    'Wrong Input!',
                    'Fields cannot be empty.',
                    [{ text: 'Okay' }],
                );
            }
            else {
                setLoading(true)
                fetch(API_URL + 'announcement', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+token
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
                      // alert(JSON.stringify(responseData))
                      if (responseData.status === 'Success'){ 
                          alert(JSON.stringify(responseData.message))
                          setAnnounceId(responseData.announcement_id)
                          console.log(responseData.announcement_id)
                          navigation.goBack()
                      }else {
                        alert('Check the fields')
                      }
                              
                  })
                  
                  .catch((error) => {
                    alert(error)
                    setLoading(false)
                  })
            }
         }

    const updateService = () => {
        if (date === null || title === null || description === null ) {
               
            Alert.alert(
                'Wrong Input!',
                'Fields cannot be empty.',
                [{ text: 'Okay' }],
            );
        }
        else {
            setLoading(true)
            fetch(API_URL + 'announcement/' + announceId ,{
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token
              },
              body: JSON.stringify({
                title: title,
                description: description,
                
              })
            })
      
              .then((response) => response.json())
              .then((responseData) => {
                console.log(responseData)
                  alert(JSON.stringify(responseData.message))
                  navigation.goBack()
                                          
              })
              
              .catch((error) => {
                alert(error)
                setLoading(false)
              })
        }
     
    }

    const Delete = (id) => {
        setLoading(true)
        fetch(API_URL + 'announcement/' +id  , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token
            },
        })
     
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status === 'Success'){
              alert(JSON.stringify(responseJson.message))
              console.log(responseJson.message)
              navigation.goBack()}
              else if(responseJson.status === 'Error'){
                  alert(JSON.stringify(responseJson.message))
                  console.log(responseJson.message)
                  navigation.goBack()
              }
                
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
        <Right>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Icon active name="plus" type="AntDesign" />
          </TouchableOpacity>
        </Right>
      </Header>
        <FlatList
          style={{flex:1}}
            data={announceArray}
            key={item => item.id}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                <View style={{width:'90%'}}>
                <Text style={[styles.title,{fontWeight: 'bold'}]}> {item.title}</Text>
                    <Text style={[styles.title,{fontSize: 14}]}> {item.description}</Text>
                    <Text style={[styles.title,{fontSize: 12}]}> Date : {item.expiry}</Text>
                </View>
                
                <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                  <Icon onPress={()=>{setModalDel2(true);setIdDel(item.id)}} 
                  style={{marginBottom:10,color:'#ff9d96',}} active name="delete" type="MaterialCommunityIcons"  />
                  <Icon onPress={()=>{
                    setModalDel(true);
                    setIdDel(item.id);
                    settitle(item.title);
                    setdescription(item.description);
                    setDate(item.expiry);
                    }} style={{color:'#67bcdb',}} active name="edit" type="Feather" />
                </View>
            </View>
            }
            keyExtractor={(item) => item.id.toString()}

          />
          <Modal
              animationType={'fade'}
              transparent={true}
              visible={modal}
              onRequestClose={() => setModal(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContainer}>
                  <View style={{width:'100%',marginVertical:10}}>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Announcement</Text>
                    </View> 
                    <View style={{flexDirection: 'row', alignItems: 'center',margin:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Title{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        style={{height:40}}
                          value={title}
                          onChangeText={(val) => settitle(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Description{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        multiline={true}
                        style={{height:100,textAlignVertical: 'top'}}
                          
                          onChangeText={(val) => setdescription(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Expiry{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                          {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                        <Input
                            placeholder=""
                            style={{height: 40}}
                            value={date.toString().slice(0, 15)}
                            onTouchStart={() => setShow(true)}
                          />
                      </Item>
                    </View>
                    <Button
                      danger={true}
                      style={styles.btns}
                      rounded
                      active={true}
                      onPressIn={() => addService()}
                      >
                      <Text style={styles.btnTxt}>Add</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={modalDel}
              onRequestClose={() => setModalDel(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContainer}>
                  <View style={{width:'100%'}}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Update Announcement</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Title{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        style={{height:40}}
                          value={title}
                          onChangeText={(val) => settitle(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Description{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        multiline={true}
                        style={{height:100,textAlignVertical: 'top'}}
                    
                          onChangeText={(val) => setdescription(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Expiry{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                          {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                        <Input
                            placeholder=""
                            style={{height: 40}}
                            value={date.toString().slice(0, 15)}
                            onTouchStart={() => setShow(true)}
                          />
                      </Item>
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => updateService()}
                      >
                      <Text style={styles.btnTxt}>Update</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={modalDel2}
              onRequestClose={() => setModalDel2(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContainerDel}>
                  <View style={{width:'100%'}}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Delete announcement ?</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => Delete()}
                      >
                      <Text style={styles.btnTxt}>Delete</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
    </Container>    
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      alignSelf:'center',
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
        fontSize:16,
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

export default ListAvatarExample; 