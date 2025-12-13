import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, borderRadius } from '../../config/styles';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
    },
    textInputWrapper: {
        width: width - (spacing.md * 2),
        flex: 1,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: borderRadius.md,
        backgroundColor: colors.offwhite,
        overflow: 'hidden',
    },
    textInput: {
        flex: 1,
        padding: spacing.md,
        fontSize: 16,
        color: colors.text,
    },
    charCount: {
        fontSize: 12,
        color: colors.textMuted,
        textAlign: 'right',
        padding: spacing.sm,
        paddingTop: 0,
    },
});
