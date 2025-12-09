import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, shadows } from "../../config/styles";
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    photoButton: {
        width: width - spacing.md * 2,
        height: width - spacing.md * 2,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        borderColor: colors.primaryFade,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: spacing.md,
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        ...shadows.large,
    },
    removePhotoButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: colors.primaryFade,
        borderRadius: borderRadius.lg,
        padding: spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        width: width - spacing.md * 2,
        height: width - spacing.md * 2,
        borderRadius: borderRadius.md,
        ...shadows.large,
    },
});
