import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { Home } from "../Home";
import {Favorites} from "../Favorites"
import { Historic } from "../Historic";
import { Settings } from "../Settings";
import { Splash } from "../Splash";

const Tabs = createBottomTabNavigator()

export function Routes(){

    return(
        <Tabs.Navigator>
            {/* <Tabs.Screen name="Splash" component={Splash} options={{headerShown: false}} /> */}
            <Tabs.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Tabs.Screen name="Favorites" component={Favorites} options={{headerShown: false}}/>
            <Tabs.Screen name="Historic" component={Historic} options={{headerShown: false}}/>
            <Tabs.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        </Tabs.Navigator>
    )

}