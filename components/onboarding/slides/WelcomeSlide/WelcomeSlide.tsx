import { Text, View, Animated } from "react-native";
import { styles } from "./WelcomeSlide.style";
import { colors } from "../../../../config/styles";
import { TreeGlow } from "../../../TreeGlow";
import SpinnerText from "../../../ui/SpinnerText/SpinnerText";
import AnimatedPhone from "./sub/phone/AnimatedPhone";
import Braggadocio from "../../../braggadocio/Braggadocio";
import { useFadeIn } from "../../../../hooks/animations/useFadeIn";
import { OnboardingSlideProps } from "../../../../config/onboardingSlides";

export const WelcomeSlide = ({ visible }: OnboardingSlideProps) => {
    const { opacity } = useFadeIn({ visible, duration: 800 });

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Check item's </Text><SpinnerText texts={['price.', 'brand.', 'model.']} style={{ top: -22 }} textStyle={{ color: colors.primary, fontSize: 24, fontWeight: 'bold' }} />
            </View>
            <Text style={styles.subheader}>Most reliable ai checkerer.</Text>

            <View style={styles.phoneContainer}>
                <AnimatedPhone />
            </View>

            <View style={styles.braggadocioContainer}>
                <Braggadocio />
            </View>
            <TreeGlow glowColor={colors.green} style={{ position: 'absolute', bottom: -200, right: -50, zIndex: -2, pointerEvents: 'none', transform: [{ scale: 2 }] }} />
        </Animated.View>
    );
}