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
        paddingBottom: spacing.xl,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    stepsContainer: {
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    step: {
        flexDirection: 'row',
        backgroundColor: colors.offwhite,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        gap: spacing.sm,
        ...shadows.small,
    },
    stepNumber: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumberText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    stepContent: {
        flex: 1,
        gap: spacing.xxs,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
    },
    stepDescription: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
});
