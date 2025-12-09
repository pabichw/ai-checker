import { StyleSheet } from "react-native";
import { spacing, colors, borderRadius } from "../../config/styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  priceSection: {
    width: '100%',
  },
  mostLikelyPriceContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.offwhite,
    borderRadius: borderRadius.md,
  },
  mostLikelyLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mostLikelyPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.green,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priceBox: {
    flex: 1,
    backgroundColor: colors.offwhite,
    padding: spacing.xs,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  priceBoxLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xxs,
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.green,
    textAlign: 'center',
  },
});