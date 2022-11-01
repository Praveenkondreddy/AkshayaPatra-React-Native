import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert,} from 'react-native'
import { Stack, Avatar } from "@react-native-material/core";



const Avatars = ({ navigation}) => {

   

    return (
        <Stack fill center spacing={4}>
    <Avatar label="Kent Dodds" autoColor />
    <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
  </Stack>
       
    )
}

const styles = StyleSheet.create({

   
  
})

export default Avatars