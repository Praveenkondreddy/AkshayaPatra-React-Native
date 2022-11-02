import React, { useEffect, useState } from 'react'
import { View, Text, Button,StyleSheet,Image,ImageBackground, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppBar } from "@react-native-material/core";



const Login = ({ navigation }) => {
   

    const [session,setSession] =useState(false)

    useEffect(()=>{

        const getValueFunction = () => {
           
            AsyncStorage.getItem('session').then(
              (value) =>{
                console.log(value);
              if(value==="start"){
                setSession(true);
              }
              }
            );
          };
          getValueFunction();

    })

    

    return (
  
           <>
           <AppBar title="Login" 
            color="white"
        centerTitle={true}/>
        <View style={{ flex: 1, justifyContent: 'flex-end',
        backgroundColor:'white', alignItems: 'center',paddingBottom:50, }}>
           <ScrollView style={{width:'96%',borderRadius:10,padding:4,borderWidth:2,marginBottom:21,marginTop:10}}>
           <View style={{padding:0}}>
                  
           <TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Activity')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"ActivityIndicator"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('AppBar')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"AppBar"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Avatar')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Avatar"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Backdrop')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Backdrop"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Badge')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Badge"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Banner')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Banner"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Button')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Button"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Chip')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Chip"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Dialog')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Dialog"}</Text>
           </TouchableOpacity><TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Divider')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Divider"}</Text>
           </TouchableOpacity>
        
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('FloatingButton')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"FloatingButton"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Icon')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Icon"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('IconButton')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"IconButton"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('ListItem')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"ListItem"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Portal')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Portal"}</Text>
           </TouchableOpacity><TouchableOpacity
           style={styles.touch}
           onPress={()=>{
            navigation.navigate('Pressable')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Pressable"}</Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Snackbar')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Snackbar"}</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Surface')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Surface"}</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Switch')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Switch"}</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('Text')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"Text"}</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={styles.touch}
           onPress={()=>{
            navigation.navigate('TextInput')
           }}>
            <Text style={{fontSize:18,color:'red'}}>{"TextInput"}</Text>
           </TouchableOpacity>


           </View>

           
          

           </ScrollView>

                
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
                    AsyncStorage.removeItem("session");
                    setSession(false);
                    navigation.navigate('Home')
                    global.draw=false

                }}
                title="Log Out"
                
                />   
        </View>
       
       </>
    )
}

const styles = StyleSheet.create({
    touch:{
        padding:10,
        borderWidth:1,
        margin:10,
        backgroundColor:"lightblue",
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        flex:1

    },

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
        color:'black',
        

    }
    ,
    button:{
      
        backgroundColor:"blue"
    }
  
})


export default Login