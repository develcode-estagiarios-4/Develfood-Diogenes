import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../../screens/Home';
import {Favorites} from '../../screens/Favorites';
import {Historic} from '../../screens/Historic';
import {Settings} from '../../screens/Settings';

import RNBootSplash from 'react-native-bootsplash';
import {TabBar} from '../../components/TabBar';

const {Navigator, Screen} = createStackNavigator();

export function Routes() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Inicio" component={Home} />
        <Screen name="Favoritos" component={Favorites} />
        <Screen name="Historico" component={Historic} />
        <Screen name="Perfil" component={Settings} />
      </Navigator>
      <TabBar />
    </>
  );
}
