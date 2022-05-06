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
    // <Tabs.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarActiveTintColor: theme.colors.icon_red,
    //     tabBarInactiveTintColor: theme.colors.icon_gray,
    //     tabBarLabelStyle: {
    //       fontSize: RFValue(12),
    //       fontFamily: theme.fonts.secondaryMed,
    //     },
    //     tabBarStyle: {
    //       height: 92,
    //       paddingBottom: 30,
    //     },
    //   }}>
    //   {/* <Tabs.Screen name="Splash" component={Splash} options={{headerShown: false}} /> */}
    //   <Tabs.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       tabBarIcon: ({color}) => (
    //         <AntDesign name="home" size={30} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="Favorites"
    //     component={Favorites}
    //     options={{
    //       tabBarIcon: ({color}) => (
    //         <MaterialIcons name="favorite-border" size={30} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="Historic"
    //     component={Historic}
    //     options={{
    //       tabBarIcon: ({color}) => (
    //         <Octicons name="history" size={30} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="Settings"
    //     component={Settings}
    //     options={{
    //       tabBarIcon: ({color}) => (
    //         <Ionicons name="person-outline" size={30} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs.Navigator>
  );
}
