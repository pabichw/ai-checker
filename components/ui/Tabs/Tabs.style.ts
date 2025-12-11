import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        marginBottom: spacing.md,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textMuted,
    },
    tabLabelActive: {
        color: colors.text,
        fontWeight: '600',
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        backgroundColor: colors.text,
        borderRadius: borderRadius.sm,
    },
    contentContainer: {
        flex: 1,
        overflow: 'hidden',
        width: '100%',
    },
    contentSlider: {
        flexDirection: 'row',
    },
    contentPanel: {},
});
