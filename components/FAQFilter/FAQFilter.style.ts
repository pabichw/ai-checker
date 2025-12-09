import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../config/styles';

export const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.offwhite,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.xs,
        ...shadows.small,
    },
    searchIcon: {
        fontSize: 16,
        opacity: 0.6,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        padding: 0,
    },
    clearIcon: {
        fontSize: 18,
        color: colors.textMuted,
        fontWeight: 'bold',
        paddingHorizontal: spacing.xs,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.offwhite,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        ...shadows.medium,
    },
    filterHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    filterIcon: {
        fontSize: 16,
        color: colors.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    arrow: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: 'bold',
    },
    categoriesContainer: {
        backgroundColor: colors.offwhite,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        ...shadows.medium,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        padding: spacing.sm,
    },
    categoryButton: {
        flex: 1,
        minWidth: '45%',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: borderRadius.sm,
        alignItems: 'center',
    },
});
