import React, {useEffect, useReducer, useMemo} from 'react'; 
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "./Context";

import { removeSession, setSession, getSession } from '../utils/Session';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/Login';  
//import { COLORS } from '../styles/index';
import BottomTabNavigator from '../menus/Tabs'; 

const Stack = createStackNavigator();


const config = {
    animation: 'spring',
    config: {
        stiffness: 2000,
        damping: 1000,
        mass: 6,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
    },
}; 
 
const AuthStackScreen = ({}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={
                {
                    title: "LOGIN",
                    headerShown: false  
                }
            }
        />   
      </Stack.Navigator>
    );
}

export default () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const resquestLogin = async () => {
      let userToken;
      try {
        userToken = await getSession("user"); 
      } catch (e) {
        // Restoring token failed
      //  console.log("error "+e);
      }
      setTimeout(() =>{
        // After restoring token, we may need to validate it in production apps
  
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
           dispatch({ type: 'RESTORE_TOKEN', token: userToken });
          }, 1000)
    };

    resquestLogin();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
          let userToken;
          try {
            userToken = await getSession("user"); 
          } catch (e) {
            // Restoring token failed
            console.log("error "+e);
          }
          console.log(userToken) 
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      signOut: () =>{
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {

        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_OUT', token: 'dummy-auth-token' });
      },
    }),
    []
  );

    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator  headerMode="none">
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
            ) : state.userToken == null || state.userToken == 0 ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="SignIn"
                component={AuthStackScreen}
                options={{
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) :(
              // Player User is signed in
              <Stack.Screen name="Home" component={BottomTabNavigator} />
            )}
        </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  };