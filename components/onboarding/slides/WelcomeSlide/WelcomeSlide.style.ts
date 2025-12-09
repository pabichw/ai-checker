import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../../config/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.sm,
        textAlign: 'center'
    },
    subheader: {
        color: colors.textSecondary,
        fontSize: 16,
        fontWeight: 'normal',
        lineHeight: 24,
        marginBottom: spacing.sm,
        textAlign: 'center'
    },
    phoneContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        marginBottom: 0,
    },
    braggadocioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
});
