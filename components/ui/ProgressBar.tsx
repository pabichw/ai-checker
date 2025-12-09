import { Animated, View, Text } from "react-native";
import { styles } from "./ProgressBar.style";
import { useEffect, useRef } from "react";

export default function ProgressBar({min = 0, max = 100, current}: {min: number, max: number, current: number}) {
    const scaleRef = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        const progressPercentage = (current - min) / (max - min);
        Animated.timing(scaleRef, {
            toValue: progressPercentage,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [current, min, max]);    

    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <Animated.View style={[
                    styles.progress, 
                    { 
                        transform: [{ scaleX: scaleRef }],
                        transformOrigin: 'left'
                    }
                ]} />
            </View>
            
            <View style={styles.labels}>
                <Text style={[styles.label, styles.min]}>{min}</Text>
                <Text style={[styles.label, styles.max]}>{max}</Text>
            </View>
        </View>
    )
}