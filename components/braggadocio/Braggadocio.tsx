import { Image, Text, View } from "react-native";
import { style } from "./Braggadocio.style";

import laurus from '../../assets/images/braggadocio/laurus.png';

export default function Braggadocio({size = 95}: {size?: number}) {
    return (
        <View style={style.container}>
            <View style={style.laurusContainer}>
                <Image resizeMode="contain" style={[style.image, {width: size, height: size}]} source={laurus} />
                <Text style={style.laurusText}>
                    No. 1 App for AI Detection
                </Text>
            </View>

            <View style={style.laurusContainer}>
                <Image resizeMode="contain" style={[style.image, {width: size, height: size}]} source={laurus} />
                <Text style={style.laurusText}>
                    Best for AI Detection in 2025
                </Text>
            </View>
        </View>
    );
}