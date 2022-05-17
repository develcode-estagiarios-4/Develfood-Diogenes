import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RNBootSplash from 'react-native-bootsplash';
import {Login} from '../../screens/loginScreens/Login';
import {Register} from '../../screens/loginScreens/Register';
import {RegisterPessoalData} from '../../screens/loginScreens/RegisterPessoalData';
import {RegisterLocale} from '../../screens/loginScreens/RegisterLocale';
import {RegisterSuccess} from '../../screens/loginScreens/RegisterSuccess';

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="RegisterPessoalData" component={RegisterPessoalData} />
        <Screen name="RegisterLocale" component={RegisterLocale} />
        <Screen name="RegisterSuccess" component={RegisterSuccess} />
      </Navigator>
    </>
  );
}
