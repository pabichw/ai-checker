import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../config/styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: colors.textSecondary,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    card: {
        backgroundColor: colors.offwhite,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.medium,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    statusBadge: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        borderRadius: borderRadius.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginBottom: spacing.xs,
    },
    statusText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    statusTextPremium: {
        color: colors.gold,
    },
    premiumDescription: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    statLabel: {
        fontSize: 15,
        color: colors.textSecondary,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    statValuePremium: {
        color: colors.gold,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginVertical: spacing.xs,
    },
    progressBarContainer: {
        marginTop: spacing.sm,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: borderRadius.xs,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.xs,
    },
    progressText: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: spacing.xxs,
        textAlign: 'right',
    },
    upgradeCard: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.medium,
    },
    upgradeTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    upgradeDescription: {
        fontSize: 14,
        color: colors.text,
        marginBottom: spacing.md,
        lineHeight: 20,
    },
    bottomSpacer: {
        height: spacing.xl,
    },
});
