import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert,} from 'react-native'

import { Stack, ActivityIndicator } from "@react-native-material/core";


const Activity = ({ navigation}) => {

   

    return (
        <Stack fill center spacing={4}>
            <Text style={styles.text}>react-native-material/core</Text>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="error" />
    <ActivityIndicator size="large" color="#00ff00" />
  </Stack>
       
    )
}

const styles = StyleSheet.create({

   text:{
    padding:10,
    fontSize:18,
    fontWeight:'bold'
   }
  
})

export default Activity