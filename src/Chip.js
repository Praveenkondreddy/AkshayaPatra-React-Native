import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert,} from 'react-native'
import { Stack, Chip } from "@react-native-material/core";



const Chips = ({ navigation}) => {

   

    return (
        <Stack fill center spacing={4}>
        <Chip label="Filled" />
        <Chip variant="outlined" label="Outlined" />
      </Stack>
       
    )
}

const styles = StyleSheet.create({

   
  
})

export default Chips