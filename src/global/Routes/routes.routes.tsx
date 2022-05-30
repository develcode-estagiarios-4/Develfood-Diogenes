import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '../../screens/Home';
import {Favorites} from '../../screens/Favorites';
import {Historic} from '../../screens/Historic';
import {Settings} from '../../screens/Settings';
import {TabBarButton} from '../../components/TabBarButton';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
// import {TabBar} from '../../components/TabBar';

const Tabs = createBottomTabNavigator();

export function Routes() {
  const theme = useTheme();

  const navigation = useNavigation();

  return (
    <>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}>
        <Tabs.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Inicio'}
                source={theme.icons.home}
                onPressed={() => navigation.navigate('Inicio' as never)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favoritos"
          component={Favorites}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Favotitos'}
                source={theme.icons.favorite}
                onPressed={() => navigation.navigate('Favoritos' as never)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Historico"
          component={Historic}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Pedidos'}
                source={theme.icons.list}
                onPressed={() => navigation.navigate('Historico' as never)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Perfil"
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Perfil'}
                source={theme.icons.user}
                onPressed={() => navigation.navigate('Perfil' as never)}
              />
            ),
          }}
        />
      </Tabs.Navigator>
      {/* <TabBar /> */}
    </>
  );
}
