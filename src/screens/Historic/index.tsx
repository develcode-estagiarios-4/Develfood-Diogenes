/* eslint-disable no-lone-blocks */
import React from 'react';
import {StatusBar, Text} from 'react-native';
import {useAuth} from '../../global/Context';
import {Container, Header} from './styles';

export function Historic() {
  const {token} = useAuth();

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <Header />

      <Text>{token}</Text>
    </Container>
  );
}

// const {
//   data: ModifyUsers,
//   loading: isloadingPut,
//   handlerPut,
// } = usePut<CreateUserPut, UserDataPut>(
//   '/public/v2/users/8552',
//   {
//     email: 'diogenes@develcode611.com',
//     gender: 'male',
//     name: 'joao',
//     status: 'active',
//   },
//   {
//     headers: {
//       'Content-type': 'application/json',
//       Authorization:
//         'Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1',
//     },
//   },
// );

// const {
//   data: DeleteData,
//   loading: isLoadingDelete,
//   handlerDelete,
// } = useDelete<UserDataDelete>('public/v2/users/8552', {
//   headers: {
//     'Content-type': 'application/json',
//     Authorization:
//       'Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1',
//   },
// });

{
  /* <View>
                  <Text>
                      {data[0].email}{'\n'}
                      {data.name}{'\n'}
                      {data.gender}{'\n'}
                      {data.status}{'\n'}
                  </Text>
                </View> */
}

{
  /* <Button title="Delete" onPress={() => handlerDelete()} />

            <Button title="Put" onPress={() => handlerPut()} /> */
}

{
  /*
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
        )} */
}

// interface CreateUserPut {
//   email: string;
//   gender: string;
//   name: string;
//   status: string;
// }

// interface UserDataPut {
//   email: string;
//   gender: string;
//   name: string;
//   status: string;
// }
// interface UserDataDelete {
//   email: string;
//   gender: string;
//   name: string;
//   status: string;
// }
