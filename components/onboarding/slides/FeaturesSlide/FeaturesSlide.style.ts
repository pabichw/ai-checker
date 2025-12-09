import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../../../config/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 140,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  featuresContainer: {
    width: '100%',
    gap: spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.medium,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.offwhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: spacing.sm,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xxs,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
