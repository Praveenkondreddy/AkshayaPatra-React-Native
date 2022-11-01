import React, { useState } from 'react'
import { View, Text,Image, TextInput,StyleSheet, Alert,} from 'react-native'
import { HStack, Banner, Button } from "@react-native-material/core";



const Banners = ({ navigation}) => {

   

    return (
        <Banner
    text="There was a problem processing a transaction on your credit card."
    buttons={
      <HStack spacing={2}>
        <Button key="fix-it" variant="text" title="Fix it" compact />
        <Button key="learn-more" variant="text" title="Learn More" compact />
      </HStack>
    }
  />
       
    )
}

const styles = StyleSheet.create({

   
  
})

export default Banners