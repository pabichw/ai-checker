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
    laurusContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    laurusText: {
        position: 'absolute',
        top: '37%',
        fontSize: 10,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#1f1f1f',
        width: '55%',
        textAlign: 'center',
    },
});