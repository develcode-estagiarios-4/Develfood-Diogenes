import React from 'react';

import {Container, LoginIcon, TextMask, Error} from './styles';

import {TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  error: string;
  editable: boolean;
  source: any;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
}

export function InputMask({
  error,
  editable,
  source,
  placeholder,
  onChangeText,
  value,
}: Props) {
  return (
    <>
      <Container>
        <LoginIcon source={source} />

        <TextMask
          type="cel-phone"
          options={{maskType: 'BRL', withDDD: true, dddMask: '(99)'}}
          placeholder={placeholder}
          autoCapitalize="none"
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
