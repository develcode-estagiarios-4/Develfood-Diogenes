import React from 'react';
import {useAuth} from '../Context';
import {AuthRoutes} from './authroutes.routes';
import {RestaurantsRoutes} from './restaurants.routes';

export function AppRoutes() {
  const {token} = useAuth();

  return token ? <RestaurantsRoutes /> : <AuthRoutes />;
}
