import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../../../config/styles";

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: spacing.md,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: spacing.md,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        flex: 1,
        overflow: 'hidden',
    },
    glow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        transform: [{ scale: 2 }],
        opacity: 0.8,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 36,
    },
    middle: {
        flex: 1,
    },
    bottom: {
        height: 32,
        width: '100%',
    },
    levelText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    lockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xxs,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    lockText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    image: {
        width: 120,
        height: 120,
    },
    lockedIcon: {
        fontSize: 48,
        color: colors.text,
        fontWeight: 'bold',
    },
    treeName: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: spacing.xxs,
        opacity: 0.9,
        width: '100%',
        textAlign: 'center',
    },
    description: {
        color: colors.text,
        fontSize: 16,
        fontStyle: 'italic',
        opacity: 0.9,
        textAlign: 'center',
    },
})