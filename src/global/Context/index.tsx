import React, {createContext, useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {usePost} from '../services/post';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  userLogin: Function;
  token: string;
  loading: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UserData {
  token: string;
  type: string;
}

const AuthContext = createContext({
  loading: false,
  userLogin: () => {},
  token: '',
} as Props);

function AuthProvider({children}: AuthProviderProps) {
  const {data, handlerPost, loading} = usePost<LoginRequest, UserData>('/auth');
  const [token, setToken] = useState('');

  const loginError = (error: any) => {
    Alert.alert(
      'Erro',
      error.response.data.status === 409
        ? 'Usuário não encontrado'
        : error.response.data.message,
    );
  };

  async function userLogin({email, password}: LoginRequest) {
    await handlerPost(
      {
        email: email,
        password: password,
      },
      loginError,
    );
    setToken(data.token);
  }

  useEffect(() => {
    setToken(data.token);
  }, [data.token, loading]);

  return (
    <AuthContext.Provider value={{userLogin, token, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const Context = useContext(AuthContext);

  return Context;
}

export {useAuth, AuthProvider};
