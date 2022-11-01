import React,{useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';



import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();




import Scanner from './Scanner';
const HomeStack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage'


import HomeStackScreen from '../App'


const Draw = () => {

  const [draw,setDraw]=useState(false)

  useEffect(()=>{

    const getValueFunction = () => {
           
      AsyncStorage.getItem('session').then(
        (value) =>{
         if(value==="start"){
          setDraw(true
            )
         }
         
        }
      );
    };
    getValueFunction();

  })
 


  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar barStyle={'light-content'} />
   
      <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeStackScreen} />
      {draw?

      (
      <><Drawer.Screen name="scanner" component={Scanner} />
      <Drawer.Screen name="Bundge"  component={Scanner}/>
      <Drawer.Screen name="Button" component={Scanner}/>
      <Drawer.Screen name="App"  component={Scanner}/>
      </>
      )
      :null}
      
      </Drawer.Navigator>
    
    </SafeAreaView>
  );
};



export default Draw;
