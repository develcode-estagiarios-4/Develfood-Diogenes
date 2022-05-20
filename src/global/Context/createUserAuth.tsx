import React, {createContext, useEffect, useState} from 'react';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {usePost} from '../services/post';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  createUserAccount: Function;
  loading: boolean;
  handleSetPostData: Function;
}

interface CreateUserAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  nickname: string;
}

interface CreateUserPost {
  email: string;
  password: string;
  creationDate: string;
  role: {
    id: number;
  };
  costumer: {
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
    photo: string;
    address: CreateUserAddress[];
  };
}

const createUser = createContext({
  loading: false,
  createUserAccount: () => {},
  handleSetPostData: () => {},
} as Props);

function CreateUserProvider({children}: AuthProviderProps) {
  const {handlerPost, loading} = usePost<CreateUserPost, any>('/user');

  const [postData, setPostData] = useState<CreateUserPost>(
    {} as CreateUserPost,
  );

  function handleSetPostData(dataPost: CreateUserPost) {
    setPostData({...dataPost, ...postData});
    console.log('-------------');
    console.log(dataPost);
  }

  const loginError = (error: any) => {
    Alert.alert(
      'Erro',
      error.response.data.status === 409
        ? 'Usuário não encontrado'
        : error.response.data.message,
    );
  };

  async function createUserAccount(request: CreateUserPost) {
    await handlerPost(request, loginError);
  }

  return (
    <createUser.Provider
      value={{createUserAccount, loading, handleSetPostData}}>
      {children}
    </createUser.Provider>
  );
}

function useCreateUser() {
  const Context = useContext(createUser);

  return Context;
}

export {useCreateUser, CreateUserProvider};
