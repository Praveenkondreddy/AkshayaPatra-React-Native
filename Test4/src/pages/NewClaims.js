import React, {useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HeaderBarIcon from '../compontent/headerBarIcon';
import NewClaimsDetailsTab from '../compontent/NewClaimsDetailsTab';
import NewUploadsTab from '../compontent/NewUploadsTab';
import NewSummaryTab from '../compontent/NewSummaryTab';
import { useSelector,useDispatch } from 'react-redux';
import { getNewCliamData, resetNewClaimsStateData } from '../store/newClaimReducer';
import { useEffect } from 'react';
import { Colors } from '../themes/Colors';
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import {Fonts} from '../fonts/Fonts';
const NewClaims = ({navigation}) => {
  const dispatch=useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBarIcon
          type="ion"
          iconName="home"
          onClick={action}
          goToHome={true}
        />
      ),
      headerRight: () => (
        <HeaderBarIcon
          type="fa"
          iconName="bars"
          onClick={action}
          goToHome={false}
        />
      ),
      headerTitle: () => null,
      headerStyle: {},
    });
  }, [navigation]);

  useEffect(()=>{
    dispatch(resetNewClaimsStateData());
    
  },[])

  const action = (goToHome) => {
    if(goToHome) 
      {
        navigation.goBack();
        dispatch(resetNewClaimsStateData()); 
      }
    else 
      {
        navigation.toggleDrawer();
      }
  };
  const {claims,upload} =useSelector(getNewCliamData);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newClaims', title: 'Claim Details'},
    {key: 'uploadDocuments', title: 'Uploads'},
    {key: 'summary', title: 'Summary'},
  ]);

 
  const renderScene = ({ route,jumpTo }) => {
    
    switch (route.key) {
      case 'newClaims':
        return <NewClaimsDetailsTab jumpTo={jumpTo} />
      case 'uploadDocuments':
        return <NewUploadsTab  jumpTo={jumpTo}/>;
        case 'summary':
          return <NewSummaryTab jumpTo={jumpTo} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor:  Colors.ORANGE, height: 3}}
      style={{backgroundColor:Colors.LIGHTGRAY4}}
      renderLabel={({route, focused, color}) => (
        <View style={styles.renderLabelView}>
          <Text
            style={{
              color: focused ? Colors.ORANGE : Colors.LIGHTGRAY1,
              fontFamily: Fonts.regular.fontFamily,
              fontSize: hp('2%'),
              fontWeight:'bold',
              height:hp('4%')
            }}>
            {route.title}
          </Text>
        </View>
      )}
      onTabPress={({ route, preventDefault }) => {
        let key=null,data={};
        preventDefault();  
        /* if (route.key === 'uploadDocuments') {  
          key='claims'
          data=claims;
        } else if(route.key === 'summary'){  
          key='uploadDocuments'
          data=upload;        
        }
        if(!checkNewClaimsData(key,data)){
          Alert.alert('Information',"Please fill all fields");
          preventDefault();     
        } */
      }}
    />
  );

  const initialLayout = {width: Dimensions.get('window').width};
  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
       
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.WHITE,
        marginTop:DeviceInfo.isTablet()?hp('5%'):hp('0%')
      }
      
});

export default NewClaims;
