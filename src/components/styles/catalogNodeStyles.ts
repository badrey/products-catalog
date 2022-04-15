import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {CHECK_BOX_SIZE} from '../constants';

const padding = 24;

export const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: CHECK_BOX_SIZE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CHECK_BOX_SIZE,
    height: CHECK_BOX_SIZE,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  subtitleContainer: {
    paddingLeft: CHECK_BOX_SIZE + padding,
  },
  headerTextContainer: {
    paddingLeft: padding,
    flex: 1,
  },
  headerText: {
    color: COLORS.black,
    fontSize: 24,
  },
  subtitleText: {
    color: COLORS.black,
    fontSize: 12,
  },
});
