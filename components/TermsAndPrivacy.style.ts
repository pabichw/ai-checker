import { StyleSheet } from 'react-native';
import { colors, spacing } from '../config/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxl,
  },
  link: {
    opacity: 0.5,
  },
});
