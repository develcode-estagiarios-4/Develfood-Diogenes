import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {Routes} from './src/global/Routes/routes.routes';
import {useEffect} from 'react';
import { Login } from './src/screens/Login';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Login />
      {/* <NavigationContainer>
        <Routes />
      </NavigationContainer> */}
    </ThemeProvider>
  );
}
