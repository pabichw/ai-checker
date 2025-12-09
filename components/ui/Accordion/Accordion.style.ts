import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../../config/styles';

export const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.offwhite,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        flex: 1,
        paddingRight: spacing.sm,
    },
    icon: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: 'bold',
    },
    content: {
        padding: spacing.md,
        paddingTop: 0,
        backgroundColor: colors.offwhite,
    },
});
