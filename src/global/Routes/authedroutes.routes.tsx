import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RestaurantProfile} from '../../screens/RestaurantProfile';
import {Routes} from './routes.routes';
import {CartProvider} from '../Context/Cart';
import {CartComponent} from '../../components/CartComponent';

const {Navigator, Screen} = createStackNavigator();

export function AuthedRoutes() {
  return (
    <>
      <CartProvider>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="Home" component={Routes} />
          <Screen name="RestaurantProfile" component={RestaurantProfile} />
          <Screen name="Cart" component={CartComponent} />
        </Navigator>
      </CartProvider>
    </>
  );
}
