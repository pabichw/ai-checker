import { StyleSheet } from 'react-native';
import { spacing } from '../config/styles';

export const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingBlockStart: 52,
    zIndex: 1000,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
});
