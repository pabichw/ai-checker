import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../config/styles";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: spacing.xxs,
        width: '100%',
    },
    track: {
        flexGrow: 1,
        height: 10,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.offwhite,
        overflow: 'hidden',
    },
    progress: {
        height: 10,
        width: '100%',
        borderRadius: borderRadius.lg,
        backgroundColor: colors.primary
    },
    labels: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    label: {
        fontSize: 12,
    },
    min: {
        color: colors.textMuted,
    },
    max: {
        color: colors.textMuted,
    },
    current: {
        color: colors.primary,
    },
});
