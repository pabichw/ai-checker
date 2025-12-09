import { Image, Animated, ImageSourcePropType } from "react-native";
import { useEffect, useRef } from "react";
import { styles } from './PhoneImage.style';

export default function PhoneImage({ source, isVisible = true }: { source: ImageSourcePropType, isVisible?: boolean }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isVisible ? 1 : 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);
    
    return (
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
            <Image source={source} style={styles.image} />
        </Animated.View>
    );
}