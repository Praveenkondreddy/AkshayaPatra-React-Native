import React, { useState } from 'react'
import { View, Text,Image, TextInput,StyleSheet, Alert,} from 'react-native'
import { Stack, Button } from "@react-native-material/core";



const Buttons = ({ navigation}) => {

   

    return (
        <Stack fill center spacing={8}>
        <Button title="Contained" />
        <Button variant="outlined" title="Outlined" />
        <Button variant="text" title="Text" />
      </Stack>
       
    )
}

const styles = StyleSheet.create({

   
  
})

export default Buttons