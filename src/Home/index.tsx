import React from "react";
import { Text, View, Button } from "react-native";
import { useFetch } from "../services/get";
import { useDelete } from "../services/delete";
import { usePost } from "../services/post";
import { usePut } from "../services/put";


interface Data{
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  nome: string;
}

export function Home(){

  const { data, loading } = useFetch<Data>('/ws/01001000/json/')

  const { data: CreateUsers, loading: isLoading, handlerPost} = usePost('/public/v2/users', {
    email: "diogenes@develcode9.com",
    gender: "male",
    name: "diogenes",
    status: "active",
  },
  {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1"
    }
  }
  )

  const { data: ModifyUsers, loading: isloading, handlerPut } = usePut('/public/v2/users/11750', {
    email: "diogenes@develcode10.com",
    gender: "female",
    name: "kevin",
    status: "active",
  },
  {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1"
    }
  }
  )

    return(
        <View style={{alignItems: 'center', justifyContent: "center", flex: 1}}>
            <Text>API's</Text>
            {loading ? <Text>Carregando...</Text> :
              <View>
                <View>
                  <Text>
                      {data.bairro}{'\n'}
                      {data.logradouro}{'\n'}
                      {data.localidade}{'\n'}
                  </Text>
                </View>

              <Button title="Create New" onPress={() => handlerPost()}/>

              <Button title="Delete" onPress={() => useDelete('/public/v2/users/11575', {
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1"
                }
              }
              )}
              />

              <Button title="Put" onPress={() => handlerPut()}/>

          </View>
        }
        </View>
    )
}