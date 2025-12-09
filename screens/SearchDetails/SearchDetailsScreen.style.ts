import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../config/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsCard: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  priceSection: {
    marginBottom: spacing.lg,
  },
  mostLikelyPriceContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.offwhite,
    borderRadius: borderRadius.md,
  },
  mostLikelyLabel: {
    fontSize: 12,
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
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: spacing.xxs,
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.green,
    textAlign: 'center',
  },
  metaSection: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xxs,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 16,
    color: colors.text,
  },
  actions: {
    gap: spacing.sm,
  },
  tip: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
