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

interface CreateUserRequest{
  email: string;
  gender: string;
  name: string;
  status: string;
}
interface UserData{
  email: string;
  gender: string;
  name: string;
  status: string;
}

interface CreateUserPut{
  email: string;
  gender: string;
  name: string;
  status: string;
}

interface UserDataPut{
  email: string;
  gender: string;
  name: string;
  status: string;
}

interface CreateUserDelete{
  email: string;
  gender: string;
  name: string;
  status: string;
}

interface UserDataDelete{
  email: string;
  gender: string;
  name: string;
  status: string;
}

export function Home(){

  const { data, loading } = useFetch<Data>('/ws/01001000/json/')

  const { data: CreateUsers, loading: isLoadingPost, handlerPost} = usePost<CreateUserRequest, UserData>('/public/v2/users', {
    email: "diogenes@develcode8012.com",
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

  const { data: ModifyUsers, loading: isloadingPut, handlerPut } = usePut<CreateUserPut, UserDataPut>(`/public/v2/users/7895`, {
    email: "diogenes@develcode611.com",
    gender: "male",
    name: "joao",
    status: "active",
  },
  {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1"
    }
  }
  )

  const {data: DeleteData, loading: isLoadingDelete, handlerDelete} = useDelete<CreateUserDelete, UserDataDelete>('public/v2/users/7895', {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1"
    }
  })

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

              <Button title="Delete" onPress={() => handlerDelete()}/>

              <Button title="Put" onPress={() => handlerPut()}/>

          </View>
        }

        {isLoadingPost ? <Text>Carregando Post</Text>: 
          <View>
            <Text>{CreateUsers?.email}</Text>
            <Text>{CreateUsers?.gender}</Text>
            <Text>{CreateUsers?.name}</Text>
            <Text>{CreateUsers?.status}</Text>
          </View>
        }

        {isloadingPut ? <Text>Carregando Put</Text>: 
          <View>
            <Text>{ModifyUsers?.email}</Text>
            <Text>{ModifyUsers?.gender}</Text>
            <Text>{ModifyUsers?.name}</Text>
            <Text>{ModifyUsers?.status}</Text>
        </View>
        }

        {isLoadingDelete ? <Text>Carregando Delete</Text> : 
          <View>
            <Text>{DeleteData?.email}</Text>
            <Text>{DeleteData?.gender}</Text>
            <Text>{DeleteData?.name}</Text>
            <Text>{DeleteData?.status}</Text>
      </View>
        }

        </View>
    )
}