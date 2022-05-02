import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { Splash } from "../Splash";
import { useState } from "react";
import { Routes } from "./routes.routes";
import { useEffect } from "react";

export function AppRoutes(){
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    },[])

    return isLoading ? <Splash/> : <Routes/>
}