import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert,} from 'react-native'
import { Badge, Stack } from "@react-native-material/core";



const Badges = ({ navigation}) => {

   

    return (
        <Stack fill center spacing={5}>
        <Badge label={4} />
        <Badge label={23} />
        <Badge label={123} color="primary" />
        <Badge label="error" color="error" />
      </Stack>
       
    )
}

const styles = StyleSheet.create({

   
  
})

export default Badges