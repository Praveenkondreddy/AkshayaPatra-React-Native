import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert,} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppBar } from "@react-native-material/core";


const AppBars = ({ navigation}) => {

   

    return (

        <AppBar title="React native material" 
        centerTitle={true}/>
       
    )
}

const styles = StyleSheet.create({

   
  
})

export default AppBars