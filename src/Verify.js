import React,{useRef, useState,useEffect} from 'react'
import { View,Button, Text,StyleSheet, TextInput, Keyboard, Alert } from 'react-native'
import RNOtpVerify from 'react-native-otp-verify';
import Counter from './Counter'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Verify = ({route,navigation}) => {

    const [otp,setOtp] =useState('')

    useEffect(()=>{
        RNOtpVerify.getHash().then(console.log).catch(console.log);

        RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log(p));

    },[]);

   const otpHandler = (message) => {
  
        const lOtp = /(\d{4})/g.exec(message)[1];
        setOtp(lOtp);
     
        RNOtpVerify.removeListener();
        Keyboard.dismiss();
    }
    
    const {phone}=route.params
    
    const pin1Ref=useRef(null)
    const pin2Ref=useRef(null)
    const pin3Ref=useRef(null)
    const pin4Ref=useRef(null)


    const [pin1,setPin1] =useState(null)
    const [pin2,setPin2] =useState(null)
    const [pin3,setPin3] =useState(null)
    const [pin4,setPin4] =useState(null)

    return (
        
        <View style={{justifyContent:'center'}}>
            <View style={{padding:20,marginBottom:80}}>
                <Text style={{fontSize:20,color:"blue"}}>
                    {'Enter 4-digit'}
                </Text>
                <Text style={{fontSize:20,color:"blue"}}>
                    {'Verification code'}
                </Text>
                <View style={{marginTop:20}}>
                <Text style={{fontSize:18,color:'black'}}>
                    Code send to +91{phone.slice(0,5)}****
                </Text>
                <Counter />
                </View>
                
            </View>
        <View style={styles.container}>
           <View style={styles.textInputView}>
            <TextInput
            ref={pin1Ref}
            keyboardType='numeric'
            maxLength={1}
            defaultValue={otp[0]}
            onChange={(pin1)=>{
                setPin1(pin1);
                if(pin1!==null){
                   pin2Ref.current.focus()
                }
            }}
            style={{textAlign:'center',fontSize:22}}
            />
           </View>
           <View style={styles.textInputView}>
            <TextInput
             ref={pin2Ref}
            keyboardType='numeric'
            maxLength={1}
            defaultValue={otp[1]}
            onChange={(pin2)=>{
                setPin2(pin2);
                if(pin2!==null){
                    pin3Ref.current.focus()
                 }
            }}
            style={{textAlign:'center',fontSize:22}}
            />
           </View>
           <View style={styles.textInputView}>
            <TextInput
             ref={pin3Ref}
            keyboardType='numeric'
            maxLength={1}
            defaultValue={otp[2]}
            onChange={(pin3)=>{
                setPin3(pin3)
                if(pin3!==null){
                    pin4Ref.current.focus()
                 }
            }}
            style={{textAlign:'center',fontSize:22}}
            />
           </View>
           <View style={styles.textInputView}>
            <TextInput
             ref={pin4Ref}
            keyboardType='numeric'
            maxLength={1}
            defaultValue={otp[3]}
            onChange={(pin4)=>{
                setPin4(pin4)
            }}
            style={{textAlign:'center',fontSize:22}}
            />
           </View>
           </View>
          
           <View style={{padding:10,marginTop:30}}>
                <Button 
                onPress={()=>{
                    if(otp==='1233'){
                        global.draw=true
                        AsyncStorage.setItem("session","start");
                        console.log(global.draw)
                        navigation.navigate("HomeTab")
                        Alert.alert("Info","Logged in successfully") 

                    }else{
                    Alert.alert("Alert","Entered wrong OTP")    
                    }
                }}
                title='verify'
                />
            </View>
        </View>
   
    )
}

const styles = StyleSheet.create({
   container:{
   
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:40
   
   },
   textInputView:{
    borderBottomWidth:1,
    width:50
   },
   underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
   button:{
    width:'80%',
    backgroundColor:"blue",
    paddingHorizontal: 20,
    
}
  
})


export default Verify