import React from "react";
import { Text, View, Button } from "react-native";
import { dataDTO } from '../dtos/dataDTO';
import { useFetch } from "../services/api";
import { usePost } from "../services/post";

interface CreatPostParams{
  name: string;
  email: string;
  gender: string;
  status: string;
}

export function Home(){

  const { data: repositories, loading } = useFetch<dataDTO[]>('/users/diego3g/repos')

    return(
        <View>
            <Text>Oi</Text>
            {loading ? <Text>Carregando...</Text> :
            <View>
            <Button title="Create New" onPress={() => usePost<CreatPostParams>('/public/v2/users', {
                email: "diogenes@develcode.com",
                gender: "masculino",
                name: "diogenes",
                status: "ativo",
              },
              {
                headers: {
                  Authorization: "Bearer 554ee3d08748731d8fa1949dfc561dc57ee741eeb82ec6ea429e30c675bab3a9"
                }
              }
                )}/>
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