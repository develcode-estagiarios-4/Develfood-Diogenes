import React from "react";
import { Text, View } from "react-native";
import { dataDTO } from '../dtos/dataDTO';
import { useApi } from "../services/api";


export function Home(){

  const { data: repositories, loading } = useApi<dataDTO[]>('https://api.github.com/users/diego3g/repos')

    return(
        <View>
            <Text>Oi</Text>
            {loading ? <Text>Carregando...</Text> :
            <View>
            {repositories?.map(repo => {
              return(
                <View key={repo.full_name}>
                  <Text>{repo.description}</Text>
                  <Text>{repo.full_name}</Text>
                </View>
                
              )
            })
          }
          </View>
        }
        </View>
    )
}