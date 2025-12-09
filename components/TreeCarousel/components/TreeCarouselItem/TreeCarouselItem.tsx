import { View, Text, Image } from "react-native";
import { styles } from "./TreeCarouselItem.style";
import { LEVEL_DEFINITIONS, LevelDefinition } from "../../../../config/trees";
import { useExperience } from "../../../../context/ExperienceContext";
import Svg, { Defs, RadialGradient as SvgRadialGradient, Stop, Circle } from 'react-native-svg';

import IconLock from '../../../../assets/icons/icon-lock.svg';

export const TreeCarouselItem = ({ item }: { item: LevelDefinition }) => {
    const { experience: { currentLevel } } = useExperience();
    
    const isLocked = currentLevel < item.level;
    const nextLevelXP = LEVEL_DEFINITIONS[item.level].xpRequired;

    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <Text style={styles.levelText}>Level {item.level}</Text>
                <View style={styles.lockContainer}>
                    {isLocked ? (
                        <>
                            <IconLock width={18} height={18} />
                            <Text style={styles.lockText}>Locked</Text>
                        </>
                    ) : (
                        <Text style={styles.lockText}>{nextLevelXP} XP</Text>
                    )}
                </View>
            </View>

            <View style={styles.middle}>
                <View style={styles.imageContainer}>
                    <Image source={item.treeImage} style={[styles.image, {...isLocked ? { tintColor: '#000' } : { }}]} />
                </View>
                <Text style={styles.treeName}>{isLocked ? '???' : item.name}</Text>
            </View>

            <View style={styles.bottom}>
                <Text style={styles.description}>{isLocked ? `Unlocks at ${nextLevelXP} XP` : item.description}</Text>
            </View>

            {/* Glow */}
            <Svg height="1000" width="1000" style={styles.glow}>
                <Defs>
                    <SvgRadialGradient id="treeGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <Stop offset="0%" stopColor={item.glowColor} stopOpacity="0.3" />
                        <Stop offset="100%" stopColor={item.glowColor} stopOpacity="0.01" />
                    </SvgRadialGradient>
                </Defs>
                <Circle cx="200" cy="200" r="300" fill="url(#treeGlow)" />
            </Svg>
        </View>
    );
}