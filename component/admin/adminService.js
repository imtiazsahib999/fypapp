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
    const [totalBud, setTotalBud] = React.useState(null)
    const [educationBud, setEductnBud] = React.useState(null)
    const [houseBud, setHouseBud] = React.useState(null)
    const [medicalBud, setMedicalBud] = React.useState(null)
    const [marraigeBud, setMarrgeBud] = React.useState(null)
    const [otherBud, setOtherBud] = React.useState(null)
    const [token, setToken] = React.useState(null)
    const [modal, setModal] = React.useState(false)
    const [modalDel, setModalDel] = React.useState(false);
    const [modalDel2, setModalDel2] = React.useState(false);
    const [idDel, setIdDel] = React.useState('');
    const [budgetArray, setBudgetArray] = React.useState([]);
    const [serviceArray, setServiceArray] = React.useState([])
    const [education, getEducation] = React.useState('')
    const [house, getHouse] = React.useState('')
    const [marriage, getMarriage] = React.useState('')
    const [medical, getMedical] = React.useState('')
    const [other, getOther] = React.useState('')



    React.useEffect(() =>  {
       
        _getUserData()
        getService()
        
        getBudget()
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
        fetch(API_URL + 'service',{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ token
            },
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            // console.log(responseJson)
            setServiceArray(responseJson.services)
        }) 
    }


      const getBudget = () => {
        fetch(API_URL + 'budget' , {
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
              
              console.log(responseJson[0] .education_budget)
              getEducation(responseJson[0].education_budget)
              getHouse(responseJson[0].house_budget)  
              getMarriage(responseJson[0].marriage_budget)
              getMedical(responseJson[0].medical_budget)
              getOther(responseJson[0].other_budget)
            })
     
            .catch((error) => {
              alert(error)
            })
     }
     
     

  const approvedService = (id) => {
  
        setLoginLoading(true)
        fetch(API_URL+'service/status' + id,{
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token

          },
          body: JSON.stringify({
            status : 'Approved',
            note : 'Approved By Admin',
        })
        })
  
          .then((response) => response.json())
          .then((responseData) => {
              if(responseData.status === 'Success'){
            alert(JSON.stringify(responseData.message))
              }else if(responseData.status === 'error'){
                  alert(JSON.stringify(responseData.message))
              }
                      
          })
          .catch((error) => {
              alert(error)
            setLoginLoading(false)
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
        <Text>Services</Text>
      </Body>
    </Header>
      <FlatList
        style={{flex:1}}
          data={serviceArray}
          key={item => item.id}
          renderItem={ ({item}) => 
              <View style={styles.container}>
              <View style={{width:'80%',marginLeft:20}}>
              <Text style={styles.title}>Education Budget:   {item.services}</Text>
                  <Text style={styles.title}>House Budget:     {item.form_object}</Text>
                  <Text style={styles.title}>  {item.status}</Text>


              </View>
             </View>
          }
          keyExtractor={(item) => item.id.toString()}

        />
        {/* <Modal
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
                    <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Budget</Text>
                  </View> 
                  <View style={{flexDirection: 'row', alignItems: 'center',margin:10}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                  </View>
                  <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}>Total Budget </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                marginTop: '5%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter your cnic" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setTotalBud(val)}
               />
              <Icon active name="contacts" type="AntDesign" />
            </Item>
          </View>

          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> Education Budget</Text>
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
              onChangeText={(val)=> setEductnBud(val)}
              />
              <Icon active name="lock-closed" type="Ionicons" />
            </Item>
          </View>

          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              House Budget{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter House Budget" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setHouseBud()}/>
              <Icon active name="mail" type="Octicons" />
            </Item>
          </View>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              Medical Budget{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter Medical Budget" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setMedicalBud()}/>
              <Icon active name="mail" type="Octicons" />
            </Item>
          </View>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              Marriage Budget{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter Marraige Budget" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setMarraigeBud()}/>
              <Icon active name="mail" type="Octicons" />
            </Item>
          </View>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              Other Budget{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <TextInput placeholder="Enter Other Budget" 
               style={{height: 40, width: '90%'}}
               onChangeText={(val)=> setOtherBud()}/>
              <Icon active name="mail" type="Octicons" />
            </Item>
          </View>
                  <Button
                    danger={true}
                    style={styles.btns}
                    rounded
                    active={true}
                    onPressIn={() => addBudget()}
                    >
                    <Text style={styles.btnTxt}>Add Budget</Text>
                  </Button>
                </View> 
                
              </View>
            </View>
          </Modal>
            </Container>     */}
            <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Approve Service ?</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => approvedService()}
                      >
                      <Text style={styles.btnTxt}>Approve</Text>
                    </Button>
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
