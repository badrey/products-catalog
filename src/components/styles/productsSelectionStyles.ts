import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  selectionsContainer: {
    paddingTop: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    color: COLORS.black,
    fontSize: 24,
    paddingHorizontal: 12,
  },
  selectionItem: {
    paddingHorizontal: 8,
    width: '50%',
  },
  selectionText: {
    color: COLORS.black,
    backgroundColor: COLORS.grey,
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 16,
    paddingHorizontal: 6,
  },
});
