import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { NavigationContainer, useRoute } from '@react-navigation/native';
import Login from './components/pages/Login'
import Profil from './components/pages/Profil'
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import isAuthenticated from './components/utils/isAuthenticated';
import Home from './components/pages/Home';
import Topic from './components/pages/Topic';
import HotTrends from './components/pages/HotTrends'
import storeCreds from './components/utils/storeCreds';
import LoadPost from './components/pages/LoadPost';
import reducer from './components/utils/reducer';
import getStoreInitialState from './components/utils/getStoreInitialState';
import { setFalseAction, setTrueAction } from './components/utils/actions';
import { globalContext } from './components/utils/globalContext';
import SelectSubReddits from './components/pages/SelectSubReddits';

type Props = {}
const Stack = createNativeStackNavigator();
function App({ }: Props) {
  const [state, dispatch] = useReducer(reducer, getStoreInitialState)

  const ContextProvider = globalContext.Provider
  useEffect(() => {
    isAuthenticated().then((v) => {
      console.log(v);
      
      if (v) {
        dispatch(setTrueAction)
      } else {
        dispatch(setFalseAction)
      }
    }).catch(err => { throw new Error(err) }
    )


  }, [state.isAuthenticated])
  return (
    <ContextProvider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >

          {state.isAuthenticated ? (

            //routes that need authentification
            <>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="home" component={SelectSubReddits} />
              <Stack.Screen name="HotTrends" component={HotTrends} />
              <Stack.Screen name="topics" component={Topic} />
              <Stack.Screen name="LoadPost" component={LoadPost}/>
              <Stack.Screen name="profil" component={Profil} />

            </>
      

          ) : (
            <>
            
            <Stack.Screen name="login" component={Login} />
            

            </>

          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}

export default App