import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert,} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const OTP = ({ navigation}) => {

   const [phone,setPhone] =useState('')

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <View >
           <Image source={require('../assets/images/akshaya.jpg')} 
               style={{ justifyContent:'center', 
                        borderRadius:120,
                        marginBottom:40}}
                            />
             </View>  
             

        
            <View style={styles.conatinerInput}>
            <Image source={require('../assets/images/india.png')} 
               style={{ height:40,width:40 }}
                            />
           
                <View style={styles.openDialog}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>{"  +91 |"}</Text>
                </View>
                
                <View style={styles.input}>
                <TextInput
                  keyboardType='numeric'
                  maxLength={10}
                  onChangeText={(text)=>{setPhone(text);}}
                  style={{fontSize:18}}
                  />
                  </View>
                  <FontAwesome5
                   name={'phone'}
                    size={20}  />
                
                </View> 
                
            <Button
               
                onPress={()=>{
                    if(phone.length<10){
                        Alert.alert("Alert","Please fill the phone number correctly.")
                    }else{
                    navigation.navigate("Verify",{phone})
                    }
                }}
                title="Send OTP"
                paddingHorizontal={100}
                />
            
        </View>
    )
}

const styles = StyleSheet.create({

    input: {
        height: 40,
        width:'58%',
        margin: 8,
        alignSelf:'flex-start'
       
      },
      conatinerInput:{
        flexDirection:'row',
        borderRadius:10,
        backgroundColor:'white',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        justifyContent:'flex-start',
        marginBottom:35,
        borderWidth:0.5,
        height:50,
        width:350
       

      },
    openDialog:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
        

    },
    button:{
      
        backgroundColor:"red",
        paddingHorizontal: 30,
        
        
    }
  
})

export default OTP