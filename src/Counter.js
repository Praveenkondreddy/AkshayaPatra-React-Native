import React from 'react'
import { View, Text} from 'react-native'

const Counter = () => {

    const [counter,setCounter]= React.useState(59);

    React.useEffect(()=>{
        const timer =
        counter>0 && setInterval(()=>setCounter(counter-1),1000)
        return () => clearInterval(timer)
    }, [counter]);

    return (
        <View>
        <Text style={{fontSize:18,color:'black'}}>
        This code will expire in <Text style={{color:'blue'}}>00:{counter}</Text>
    </Text>
    </View>
    
  
)
    }
export default Counter