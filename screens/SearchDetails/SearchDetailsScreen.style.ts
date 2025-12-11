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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  mainSection: {
    marginBottom: spacing.lg,
  },
  mostLikelyPriceContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.offwhite,
    borderRadius: borderRadius.md,
  },
  textContent: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
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
