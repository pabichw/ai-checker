import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../config/styles';

export const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        ...shadows.medium,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.offwhite,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    headerIcon: {
        fontSize: 18,
        color: colors.primary,
    },
    headerText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
    arrow: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: 'bold',
    },
    optionsContainer: {
        backgroundColor: colors.offwhite,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.05)',
    },
    selectedOption: {
        backgroundColor: 'rgba(205, 78, 78, 0.1)',
    },
    optionText: {
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    selectedOptionText: {
        color: colors.primary,
        fontWeight: '600',
    },
    checkmark: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
});
