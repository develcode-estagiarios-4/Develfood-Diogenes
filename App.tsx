import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/Routes';


export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes/>
    </NavigationContainer>
  );
}