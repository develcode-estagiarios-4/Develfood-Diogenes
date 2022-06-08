import React from 'react';
import {useState} from 'react';
import {Control} from 'react-hook-form';

import {
  Container,
  InputLogin,
  LoginIcon,
  Error,
  IconPassword,
  LogoHide,
} from './styles';

import {KeyboardType, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  name?: string;
  control?: Control;
  error?: string;
  editable?: boolean;
  source: any;
  placeholder: string;
  keyboardType?: KeyboardType;
  sourcePassword?: any;
  onChangeText: (value: string) => void;
  value?: string;
  maxLength?: number;
  onEndEditing?: (value: any) => void;
}

export function Input({
  error,
  editable,
  source,
  placeholder,
  keyboardType,
  sourcePassword,
  onChangeText,
  value,
  maxLength,
  onEndEditing,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);

  function updateSecureTextEntry() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <InputLogin
          placeholder={placeholder}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={!isClicked}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          maxLength={maxLength}
          onEndEditing={onEndEditing}
        />

        {sourcePassword && (
          <IconPassword onPress={() => updateSecureTextEntry()}>
            <LogoHide source={sourcePassword} />
          </IconPassword>
        )}
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
