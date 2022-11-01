import React, { useEffect, useState } from 'react'
import { View, Text, Button,StyleSheet,Image,ImageBackground} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {
     

    useEffect(()=>{

        const getValueFunction = () => {
           
            AsyncStorage.getItem('session').then(
              (value) =>{
               
              if(value==="start"){
               navigation.navigate('Login')
              }
              }
            );
          };
          getValueFunction();

    })

    
    return (
  
           
        <View style={{ flex: 1, justifyContent: 'flex-end',
        backgroundColor:'white', alignItems: 'center',paddingBottom:50 }}>
            <Image source={require('../assets/images/akshaya.jpg')} 
                style={{ justifyContent:'center', 
            width:430,
            height:430,
        marginBottom:20}}
                 />

                 
           <Text style={styles.text}>
            OUR MISSION
            </Text>
            
           <Text style={styles.view}>
            No child in India should be deprived of
             education because of hunger
            </Text>
           <Button
                style={styles.button}
                onPress={()=>{
                    navigation.navigate("OTP")
                }}
                title="Get Start"
                
                />
  
        </View>
       
       
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:22,
        fontWeight:'bold',
        color:"blue"
        
    },
    view:{
        justifyContent:"center",
        fontSize:18,
        textAlign: 'center',
        padding:30,
        color:'black'

    }
    ,
    button:{
      
        backgroundColor:"blue"
    }
  
})


export default Home