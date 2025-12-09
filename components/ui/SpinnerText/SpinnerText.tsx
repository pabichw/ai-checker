import { useEffect, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { style } from "./SpinnerText.style";
import SpinnerTextItem from "./sub/SpinnerTextItem";

export default function SpinnerText({ texts, style: containerStyle, textStyle, reservedItemWidth = 85, interval = 2000 }: { texts: string[], style?: StyleProp<ViewStyle>, textStyle?: StyleProp<TextStyle>, reservedItemWidth?: number, interval?: number }) {
    const [activeTextId, setActiveTextId] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveTextId((prev) => (prev + 1) % texts.length);
        }, interval);
        
        return () => clearInterval(intervalId);
    }, [interval]);
    
    return (
        <View style={[style.container, containerStyle]}>
            {texts.map((text, index) => (
                <SpinnerTextItem key={index} text={text} isActive={index === activeTextId} reservedWidth={reservedItemWidth} textStyle={textStyle} />
            ))}
        </View>
    )
}