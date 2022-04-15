import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/colors';
import {CHECK_BOX_SIZE} from '../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey,
    borderWidth: 2,
    height: hp(70),
    borderColor: COLORS.blue,
  },
  contentContainer: {
    paddingBottom: CHECK_BOX_SIZE,
    paddingRight: CHECK_BOX_SIZE,
  },
});
