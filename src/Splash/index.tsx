import React from "react";
import LottieView from "lottie-react-native"

import { Container } from "./styles";
import { Text } from "react-native";


export function Splash(){
    return(
        <Container>
            <Text style={{top: 20, position: 'absolute'}}>DevelFood</Text>
            <LottieView 
                source={require('../assets/splash.json')} 
                autoPlay 
                loop={false}
            />
        </Container>
    )
}