import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>Home </Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions = { ({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color)
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Settings" component={SettingsScreen}  /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function screenOptions(route, color){
    let iconName;
    switch (route.name) {
        case "Home":
            iconName = "home"
            break; 
        case "Settings":
            iconName = "cellphone-settings"
            break; 
        default:
            break;
    }
    return (
      <FontAwesome5
        name={iconName}
        color={color}
        size={26}   
      />
    
    )
  }