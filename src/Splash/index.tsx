import React from "react";
import LottieView from "lottie-react-native"
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { Container } from "./styles";


export function Splash(){
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}]
            }))
        }, 3000)
    }, [])

    return(
        <Container>
            <LottieView 
                source={require('../assets/splash.json')} 
                autoPlay 
                loop={false}
            />
        </Container>
    )
}