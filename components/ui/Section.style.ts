import { StyleSheet } from "react-native";
import { colors, spacing } from "../../config/styles";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: spacing.sm,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        right: 0,
        top: -13,
        width: 35, 
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    }
});