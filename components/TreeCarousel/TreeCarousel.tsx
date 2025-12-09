import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { ImpactFeedbackStyle } from "expo-haptics";
import { LEVEL_DEFINITIONS, LevelDefinition } from "../../config/trees";
import { TreeCarouselItem } from "./components/TreeCarouselItem/TreeCarouselItem";
import { useHaptic } from "../../hooks/useHaptic";
import { useExperience } from "../../context/ExperienceContext";

const width = Dimensions.get('window').width;

interface Props {
    onScrollEnd: (level: LevelDefinition) => void;
}

export default function TreeCarousel({ onScrollEnd }: Props) {
    const { experience: { currentLevel }} = useExperience();
    const { impactAsync } = useHaptic();

    const handleScrollEnd = (slideIndex: number) => {
        impactAsync(ImpactFeedbackStyle.Soft);
        onScrollEnd(LEVEL_DEFINITIONS[slideIndex]);
    }

    return (
        <Carousel
            width={width}
            height={300}
            data={LEVEL_DEFINITIONS}
            loop={true}
            defaultIndex={LEVEL_DEFINITIONS.findIndex(level => level.level === currentLevel)}
            scrollAnimationDuration={500}
            renderItem={TreeCarouselItem}
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.8,
                parallaxScrollingOffset: 100,
            }}
            pagingEnabled={true}
            snapEnabled={true}
            onScrollEnd={handleScrollEnd}
        />
    )
}