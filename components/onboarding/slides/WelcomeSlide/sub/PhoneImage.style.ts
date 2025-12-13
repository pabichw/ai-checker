import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
    },
    image: {
        position: 'absolute',
        width: 160,
        height: 420,
        top: 0,
        left: 0,
        zIndex: 1,
        transform: [{ translateY: -210 }, { translateX: -80 }],
    },
});
