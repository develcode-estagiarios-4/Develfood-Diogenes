import React from 'react';
import {useAuth} from '../Context';
import {AuthRoutes} from './authroutes.routes';
import {Routes} from './routes.routes';

export function AppRoutes() {
  const {token} = useAuth();

  return token ? <Routes /> : <AuthRoutes />;
}
