import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../config/styles";
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        gap: spacing.sm,
        alignItems: 'stretch',
        paddingHorizontal: spacing.md,
    },
    body: {
        flex: 1,
        gap: spacing.sm,
    },
    actions: {
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%'
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        gap: spacing.sm,
    },
    tipContainer: {
        alignItems: 'center',
        gap: spacing.xxs,
    },
    accordionHeader: {
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
        backgroundColor: 'transparent',
        width: '100%'
    },
    accordionTitle: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    accordionIcon: {
        color: colors.text,
        opacity: 0.6,
    },
    accordionContent: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: spacing.xs,
    },
    tip: {
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'center',
        color: colors.textMuted,
    },
    gridActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    gridAction: {
        flex: 1,
        minWidth: 100,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: borderRadius.md,
    },
    gridActionText: {
        fontWeight: '600',
        textAlign: 'center'
    },
    gridActionIcon: {
        height: 35,
        marginBottom: spacing.xs,
        opacity: 0.82
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        height: 100,
        backgroundColor: colors.offwhite
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.green,
        textAlign: 'center',
    },
    resultContainer: {
        alignItems: 'center',
        gap: spacing.md,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
    }
})