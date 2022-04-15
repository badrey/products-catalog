// @ts-ignore
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

// @ts-ignore
import icoMoonConfig from './selection.json';

/**
 * Icon icon set component.
 * Usage: <Icon name="icon-name" size={20} color="#4F8EF7" />
 */
export const SvgIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);

export const SvgIconNames = {
  Checkmark: 'checkmark',
};
