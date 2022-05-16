import React from 'react';
import {Login} from '../../screens/Login';
import {useAuth} from '../Context';
import {Routes} from './routes.routes';

export function AppRoutes() {
  const {token} = useAuth();

  return token ? <Routes /> : <Login />;
}
