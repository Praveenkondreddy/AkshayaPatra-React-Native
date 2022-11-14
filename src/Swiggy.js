import React, { useState } from 'react'
import { View, Text,Image, TextInput,Button,StyleSheet, Alert, SafeAreaView, TouchableOpacity, Dimensions, ScrollView,} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Surface, Stack } from "@react-native-material/core";


const images=[
    'https://media.insider.in/image/upload/c_crop,g_custom/v1659447117/jhb24jlelbzajg11gdtr.jpg',
    'https://coupenyaari.in/wp-content/uploads/2022/08/Swiggy-Big-Birthday-Bash-Sale-min-1200x900.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUDWeSFsh355ZXDX3zbTTEuY_MK98Ju9VqtpLMOsvX_NpHN_3S2KbfTEjGsEOuzkKaTVRbkTlIgS7n0cZW4btMBcEF3KIF3AOdBfRUTPt08-P2P3bLq0WRKnZE53ecQKTep5AazWLJ49otT2u6JdvbVOuBN6wdRpg4_LXZ3wANva9RYtEvZT3xI5PIIQ/w1200-h630-p-k-no-nu/Swiggy%20Instamart%20Free%20Birthday%20Gift%20With%20Every%20Order.webp'
]

const WIDTH= Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;

const Swiggy = ({ navigation}) => {

    const [imgActive,setImgActive]=useState(0);

    onChange=(nativeEvent) =>{
        if(nativeEvent){
            const slide=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
            if(slide!=imgActive){
                setImgActive(slide)
            }
        }

    }
   
    return (
        <SafeAreaView style={styles.safe}>
            <View style={{flexDirection:'row',marginBottom:10,justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:22,fontWeight:'bold',color:'black'}}>
                        Velchery
                    </Text>
                    <Text>
                        Ramagiri nagar, Velchery, Tamilnadu
                    </Text>


                </View>
                <View>
                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('home')
                    }}>
                    <Icon
                            name="user"
                            size={32}
                        
                            />

                    </TouchableOpacity>
                            
                           

                </View>

            </View>
               <Surface
                elevation={4}
                category="medium"
                style={{ width: 363,marginVertical:10, height: 50,justifyContent:'center' }}
                > 
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('search')
                }}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text style={{fontSize:18,color:'black'}}>Search for restaurant item or more</Text>
                <Icon
                name="search"
                size={22}
               
              />
              </View>  
                </TouchableOpacity>
                </Surface>  


                <View>
            <View style={{marginVertical:23,flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Food')
                }}>
                <View style={{alignItems:'center',marginHorizontal:10}}>
                    <View style={styles.images}>
                    <Image source={require('../assets/images/food.jpg')} 
               style={styles.image}
                            />
                    </View>
                
                 <Text style={styles.text}>
                    Food
                    </Text>           
                </View>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>{
                navigation.navigate('InstaMart')
               }}>
               <View style={{alignItems:'center',marginHorizontal:10}}>
                    <View style={styles.images}>
                    <Image source={require('../assets/images/chips.jpg')} 
               style={styles.image}
                            />
                    </View>
                
                 <Text style={styles.text}>
                    InstaMart
                    </Text>           
                </View>
               </TouchableOpacity>


                <TouchableOpacity onPress={()=>{
                navigation.navigate('Dineout')
               }}> 
                <View style={{alignItems:'center',marginHorizontal:10}}>
                    <View style={styles.images}>
                    <Image source={require('../assets/images/dine.jpg')} 
               style={styles.image}
                            />
                    </View>
                
                 <Text style={styles.text}>
                    Dineout
                    </Text>           
                </View>
                </TouchableOpacity>
                
               
                
            </View>  
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Genie')
               }}>
                <View style={{alignItems:'center',marginHorizontal:10}}>
                    <View style={styles.images}>
                    <Image source={require('../assets/images/genie.jpg')} 
               style={styles.image}
                            />
                    </View>
                
                 <Text style={styles.text}>
                    Genie
                    </Text>           
                </View>
                </TouchableOpacity>
                
                <View style={{alignItems:'center',marginHorizontal:10}}>
                    <View style={styles.images}>
                    <Image source={require('../assets/images/meat.jpg')} 
               style={styles.image}
                            />
                    </View>
                
                 <Text style={styles.text}>
                    Meat Delivery
                    </Text>           
                </View>
                
                
               
                
            </View>  
            </View>  

            <View style={styles.wrap}>

                <ScrollView
                onScroll={({nativeEvent})=> onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
                >
                    {
                       images.map((e,index)=>(
                        <Image
                        key={e}
                        resizeMode='contain'
                        style={styles.wrap}
                        source={{uri:e}}
                        
                        />
                       )

                       ) 
                    }
                

                </ScrollView>

                <View style={styles.wrapDot}>
                    {
                        images.map((e,index)=>
                        <Text
                        key={e}
                        style={imgActive == index? styles.dotActive:styles.dot}
                        >
                          ●
                        </Text>
                        )
                    }
                </View>


            </View>  

       
        </SafeAreaView>
    
       
    )
}

const styles = StyleSheet.create({
     
    safe:{
        margin:15
    },
    wrap:{
        width:360,
        height:HEIGHT*0.27,
        marginTop:10,
        borderRadius:10

    },
    text:{
      color:'black',
      fontSize:17,
      paddingTop:5,
      fontWeight:'bold'
    },
    image:{
         height:75,
         width:80 
    },
    images:{
         
         backgroundColor:'white',
         height:80,
         width:100,
         justifyContent:'flex-end',
         alignItems:'center',
         borderRadius:10
         

    },
    dot:{
       margin:3,
       color:'#888'
    },
    dotActive:{
        margin:3,
        color:'black'
    },
    wrapDot:{
        position:'absolute',
        flexDirection:'row',
        bottom:-23,
        alignSelf:'center'
    }

   
  
})

export default Swiggy
