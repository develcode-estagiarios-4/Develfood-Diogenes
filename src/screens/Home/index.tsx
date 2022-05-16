/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button, FlatList, StatusBar} from 'react-native';
import {useFetch} from '../../global/services/get';
import {useDelete} from '../../global/services/delete';
import {usePut} from '../../global/services/put';

import {Container, Content, Header} from './styles';
import {useAuth} from '../../global/Context';

interface Data {
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface CreateUserPut {
  email: string;
  gender: string;
  name: string;
  status: string;
}

interface UserDataPut {
  email: string;
  gender: string;
  name: string;
  status: string;
}
interface UserDataDelete {
  email: string;
  gender: string;
  name: string;
  status: string;
}

export function Home() {
  const {data, loading} = useFetch<Data[]>('/public/v2/users');

  const {token} = useAuth();

  const {
    data: ModifyUsers,
    loading: isloadingPut,
    handlerPut,
  } = usePut<CreateUserPut, UserDataPut>(
    '/public/v2/users/8552',
    {
      email: 'diogenes@develcode611.com',
      gender: 'male',
      name: 'joao',
      status: 'active',
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1',
      },
    },
  );

  const {
    data: DeleteData,
    loading: isLoadingDelete,
    handlerDelete,
  } = useDelete<UserDataDelete>('public/v2/users/8552', {
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1',
    },
  });

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />

      <Header />

      <Content>
        <Text>API's</Text>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <>
                  <Text>Email: {item.email}</Text>
                  <Text>Gender: {item.gender}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Status: {item.status}</Text>
                </>
              )}
              style={{width: '100%', borderWidth: 2, marginTop: 150}}
            />

            {/* <View>
                  <Text>
                      {data[0].email}{'\n'}
                      {data.name}{'\n'}
                      {data.gender}{'\n'}
                      {data.status}{'\n'}
                  </Text>
                </View> */}

            <Button title="Delete" onPress={() => handlerDelete()} />

            <Button title="Put" onPress={() => handlerPut()} />
          </View>
        )}

        <Text>{token}</Text>

        {isloadingPut ? (
          <Text>Carregando Put</Text>
        ) : (
          <View>
            <Text>{ModifyUsers?.email}</Text>
            <Text>{ModifyUsers?.gender}</Text>
            <Text>{ModifyUsers?.name}</Text>
            <Text>{ModifyUsers?.status}</Text>
          </View>
        )}

        {isLoadingDelete ? (
          <Text>Carregando Delete</Text>
        ) : (
          <View>
            <Text>{DeleteData?.email}</Text>
            <Text>{DeleteData?.gender}</Text>
            <Text>{DeleteData?.name}</Text>
            <Text>{DeleteData?.status}</Text>
          </View>
        )}
      </Content>
    </Container>
  );
}
