import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/Routes/routes.routes';
import { useApi } from './src/services/api';
import { dataDTO } from './src/dtos/dataDTO';


export default function App() {

  const {data} = useApi<dataDTO[]>('https://api.github.com/users/diego3g/repos')

  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}