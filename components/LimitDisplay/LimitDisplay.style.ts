import { StyleSheet } from "react-native";
import { colors, spacing } from "../../config/styles";

export default StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    text: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    textBold: {
        fontWeight: 'bold',
        color: colors.primary,
    }
});
