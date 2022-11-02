
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
import Home from './src/Home';
import OTP from './src/OTP';
import Verify from './src/Verify';

import Login from './src/Login'


import Activity from './src/Activity';
import AppBars from './src/AppBar';
import Avatars from './src/Avatar';
import Backdrops from './src/Backdrop';
import Badges from './src/Badge';
import Banners from './src/Banner';
import Buttons from './src/Button';
import Chips from './src/Chip';
import Dialogs from './src/Dialog';
import Dividers from './src/Divider';
import FloatingButtons from './src/FloatingButton';
import Icons from './src/Icon';
import IconButtons from './src/IconButton';
import ListItems from './src/ListItem';
import Portals from './src/Portal';
import Pressables from './src/Pressable';
import Snackbars from './src/Snackbar';
import Surfaces from './src/Surface';
import Switchs from './src/Switch';
import Texts from './src/Text';
import TextInputs from './src/TextInput';
import Swiggy from './src/Swiggy';
import Food from './src/Food'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import Dineout from './src/Dineout';
import InstaMart from './src/InstaMart';
import Genie from './src/Genie';
import Search from './src/Search';

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Swiggy') {
              iconName = 'home';
              size = focused ? 23 : 20;
            } else if (route.name === 'Food') {
              iconName = 'search';
              size = focused ? 23: 20;
            }else if (route.name === 'InstaMart') {
              iconName = 'tags';
              size = focused ? 23 : 20;
            }else if (route.name === 'Dineout') {
              iconName = 'gift';
              size = focused ? 23 : 20;
            }else if (route.name === 'Genie') {
              iconName = 'user';
              size = focused ? 23 : 20;
            }
            return (
              <Icon
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })
      }
      tabBarOptions={{
        activeTintColor: '#0080ff',
        inactiveTintColor: '#777777',
        labelStyle: { fontSize: 15, fontWeight: 'bold' }
      }}
      
    >
      <Tab.Screen name={'Swiggy'} component={Swiggy}  options={{headerShown: false,}}/>
      <Tab.Screen name={'Food'} component={Food}  options={{headerShown: false,}} />
      <Tab.Screen name={'InstaMart'} component={InstaMart}  options={{headerShown: false,}}/>
      <Tab.Screen name={'Dineout'} component={Dineout}  options={{headerShown: false,}}/>
      <Tab.Screen name={'Genie'} component={Genie}  options={{headerShown: false,}}/>
    </Tab.Navigator>
  );
}

const App = () => {


  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
      <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home',headerShown: false }}
          />
          <HomeStack.Screen name="OTP" component={OTP} options={{headerShown: false,}}/>
          <HomeStack.Screen name="HomeTab" component={HomeTabs} options={{headerShown: false,}}/>
          <HomeStack.Screen name="Login" 
                 component={Login}
                 options={{headerShown: false,}} />
          <HomeStack.Screen name="Verify" component={Verify} 
          options={{headerShown: false,}}/>
          <HomeStack.Screen name="search" component={Search} />
          <HomeStack.Screen name="Activity" component={Activity} />
          <HomeStack.Screen name="AppBar" component={AppBars} />
          <HomeStack.Screen name="Avatar" component={Avatars} />
          <HomeStack.Screen name="Backdrop" component={Backdrops} />
          <HomeStack.Screen name="Badge" component={Badges} />
          <HomeStack.Screen name="Banner" component={Banners} />
          <HomeStack.Screen name="Button" component={Buttons} />
          <HomeStack.Screen name="Chip" component={Chips} />
          <HomeStack.Screen name="Dialog" component={Dialogs} />
          <HomeStack.Screen name="Divider" component={Dividers} />
          <HomeStack.Screen name="FloatingButton" component={FloatingButtons} />
          <HomeStack.Screen name="Icon" component={Icons} />
          <HomeStack.Screen name="IconButton" component={IconButtons} />
          <HomeStack.Screen name="ListItem" component={ListItems} />
          <HomeStack.Screen name="Portal" component={Portals} />
          <HomeStack.Screen name="Pressable" component={Pressables} />
          <HomeStack.Screen name="Snackbar" component={Snackbars} />
          <HomeStack.Screen name="Surface" component={Surfaces} />
          <HomeStack.Screen name="Switch" component={Switchs} />
          <HomeStack.Screen name="Text" component={Texts} />
          <HomeStack.Screen name="TextInput" component={TextInputs} />
         
        </HomeStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};



export default App;
