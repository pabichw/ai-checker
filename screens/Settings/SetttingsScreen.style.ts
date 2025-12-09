
import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../config/styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        gap: spacing.md,
        paddingBlockStart: spacing.xl,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBlockEnd: 32,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.offwhite,
      paddingBlockStart: spacing.xxs,
    },
    premiumIcon: {
      fontSize: 22,
    },
    bottomActions: {
      paddingHorizontal: spacing.md,
      marginHorizontal: 'auto',
      width: '100%',
      alignItems: 'center',
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingBlockEnd: spacing.xl,
    }
  });
  