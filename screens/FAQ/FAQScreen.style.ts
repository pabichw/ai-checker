import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../config/styles';

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
    accordionContainer: {
        marginBottom: spacing.lg,
    },
    answerText: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    noResults: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    noResultsSubtext: {
        fontSize: 14,
        color: colors.textMuted,
        textAlign: 'center',
    },
});
