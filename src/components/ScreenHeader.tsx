import * as React from 'react';
import {Text} from 'react-native';
import {styles} from './styles/screenHeaderStyles';

type Props = {
  title: string;
};

export function ScreenHeader({title}: Props) {
  return <Text style={styles.text}>{title}</Text>;
}
