import { Animated } from "react-native";
import { useEffect, useState } from "react";
import PhoneImage from "../PhoneImage";
import { styles } from "./AnimatedPhone.style";
import { useLevitation } from "../../../../../../hooks/animations/useLevitation";

export default function AnimatedPhone() {
    const [visibleImageIdx, setVisibleImageIdx] = useState(0);
    const levitationStyle = useLevitation({ duration: 3000, distance: 20 });

    const images = [
        require('../../../../../../assets/images/mocks/screenshot_1.png'),
        require('../../../../../../assets/images/mocks/screenshot_2.png'),
        require('../../../../../../assets/images/mocks/screenshot_3.png'),
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleImageIdx((prevIdx) => (prevIdx + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Animated.View style={[styles.phone, levitationStyle]}>
            {images.map((image, index) => (
                <PhoneImage key={index} source={image} isVisible={index === visibleImageIdx} />
            ))}
        </Animated.View>
    );
}
