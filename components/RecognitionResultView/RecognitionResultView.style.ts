import { StyleSheet } from "react-native";
import { colors, spacing } from "../../config/styles";

export default StyleSheet.create({
    container: {
        gap: spacing.md
    },
    textContainer: {
        flexDirection: 'row',
        gap: spacing.xs,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '500'
    },
    isOrIsNotText: {
        fontSize: 24,
        fontWeight: '800'
    }
})