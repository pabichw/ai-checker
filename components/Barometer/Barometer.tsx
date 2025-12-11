import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import {colors} from '../../config/styles'
import styles from './Barometer.style'

interface Props {
    value: number;
    size?: number;
    strokeWidth?: number;
}

export default function Barometer({ 
    value, 
    size = 200, 
    strokeWidth = 16,
}: Props) {
    const clampedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius; 
    const progressOffset = circumference - (clampedValue / 100) * circumference;

    const progressColor = value > 50 ? colors.red : colors.green;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size / 2 + strokeWidth / 2}>
                {/* Background half-ring */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={"#E5E5E5"}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    rotation={180}
                    origin={`${size / 2}, ${size / 2}`}
                    strokeDasharray={`${circumference}, ${circumference * 2}`}
                />
                {/* Progress half-ring */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    rotation={180}
                    origin={`${size / 2}, ${size / 2}`}
                    strokeDasharray={`${circumference}, ${circumference * 2}`}
                    strokeDashoffset={progressOffset}
                />
            </Svg>
            <Text style={styles.valueText}>{clampedValue}%</Text>
        </View>
    )
}