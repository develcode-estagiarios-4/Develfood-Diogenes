import React from 'react';
import {useTheme} from 'styled-components';

import {ArrowIcon, ButtonIcon} from './styles';

interface Props {
  onPressed: Function;
  name: string;
}

export function BackButton({onPressed, name}: Props) {
  const theme = useTheme();
  return (
    <ButtonIcon onPress={() => onPressed()}>
      <ArrowIcon
        source={
          name === 'arrow'
            ? theme.icons.arrow
            : name === 'exit'
            ? theme.icons.exit
            : null
        }
      />
    </ButtonIcon>
  );
}
