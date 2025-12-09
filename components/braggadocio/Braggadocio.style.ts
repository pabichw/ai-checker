import { StyleSheet } from "react-native";
import { spacing } from "../../config/styles";

export const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xxl,
        width: '100%',
    },
    image: {
        tintColor: '#1f1f1f',
    },
});