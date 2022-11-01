import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground,Button, Image} from 'react-native';


const Background = ({navigation})=>{
   
        return(
            <>
            <View style={styles.background}>
            <ImageBackground
                source={require('../assets/images/child.png')}
                style={{width: '100%', height: '80%'}}
               
               >
                   <View >

                  <View style={{shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.27,
                                    shadowRadius: 4.65,

                                    elevation: 6,}}>
                   <Image source={require('../assets/images/akshaya.jpg')} 
                     style={{ justifyContent:'center', 
                         borderRadius:120,
                         alignSelf:'center',
                         bottom:-120,
                        
                        
                     }}
                            />
                            </View>
                    </View>
            </ImageBackground>
           
            </View>



            <View style={{ flex: 2, justifyContent: 'flex-end',
        backgroundColor:'white', alignItems: 'center',paddingBottom:50 }}>
           
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
                    navigation.navigate("Background")
                }}
                title="Get Start"
                
                />
        </View>
       

            </>
        );
    
}

const styles = StyleSheet.create({
    background:{
        flex:2,
        backgroundColor:'white'
    },

   
    textStyle: {
        marginTop: 10,
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    balanceContainer:{
        padding:10,
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
        color:'black'

    }
    ,
    button:{
      
        backgroundColor:"blue"
    }
  });

export default Background;