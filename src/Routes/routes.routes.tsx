import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { Home } from "../Home";
import {Favorites} from "../Favorites"
import { Historic } from "../Historic";
import { Settings } from "../Settings";

const Tabs = createBottomTabNavigator()

export function Routes(){

    return(
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="Favorites" component={Favorites}/>
            <Tabs.Screen name="Historic" component={Historic}/>
            <Tabs.Screen name="Settings" component={Settings}/>


        </Tabs.Navigator>
    )

}