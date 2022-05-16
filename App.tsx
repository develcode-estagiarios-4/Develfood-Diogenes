import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {useEffect} from 'react';
import {AuthProvider} from './src/global/Context';
import {AppRoutes} from './src/global/Routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
