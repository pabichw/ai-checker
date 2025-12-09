import { Image, View } from "react-native";
import { style } from "./Braggadocio.style";

export default function Braggadocio({size = 95}: {size?: number}) {
    return (
        <View style={style.container}>
            <Image resizeMode="contain" style={[style.image, {width: size, height: size}]} source={require('../../assets/images/braggadocio/no1.png')} />
            <Image resizeMode="contain" style={[style.image, {width: size, height: size}]} source={require('../../assets/images/braggadocio/best_for_begginners.png')} />
        </View>
    );
}