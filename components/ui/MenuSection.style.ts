import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../config/styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "800",
    paddingBlockEnd: spacing.xs,
    paddingInlineStart: spacing.sm,
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: 'rgba(255, 255, 255, 0.09)',
  },
  optionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionHighlighted: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  optionTextHighlighted: {
    fontWeight: "700",
  },
});