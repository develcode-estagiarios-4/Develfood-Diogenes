import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RestaurantProfile} from '../../screens/RestaurantProfile';
import {Routes} from './routes.routes';

const {Navigator, Screen} = createStackNavigator();

export function RestaurantsRoutes() {
  return (
    <>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Home" component={Routes} />
        <Screen name="RestaurantProfile" component={RestaurantProfile} />
      </Navigator>
    </>
  );
}
