import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView, 
  useColorScheme 
} from 'react-native'; 
import { Colors} from 'react-native/Libraries/NewAppScreen';
import Tab from './src/menus/Tabs'
 
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App  =  () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <Tab />
    </SafeAreaProvider>
  );
};
 
export default App;
