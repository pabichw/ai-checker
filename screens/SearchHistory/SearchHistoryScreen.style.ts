import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../config/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  clearButton: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  historyItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.background,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    width: '100%',
    ...shadows.medium,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xxs,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '600',
  },
  itemDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
