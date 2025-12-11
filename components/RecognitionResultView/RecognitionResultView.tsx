import { Text, View } from "react-native";
import Barometer from "../Barometer/Barometer";
import { RecognitionResult } from "../../types/recognition";
import styles from "./RecognitionResultView.style";
import { colors } from "../../config/styles";

interface Props {
    result: RecognitionResult
}

export const isOrIsNotAI = (value: number): 'IS' | 'IS NOT' | 'MAY BE' => {
    if (value >= 0.60) {
        return 'IS'
    } else if (value > 0.40 && value < 0.60) {
        return 'MAY BE'
    } else {
        return 'IS NOT'
    }
}

export default function ({ result }: Props) {

    let properColor = '';

    switch (isOrIsNotAI(result.ai_indicator)) {
        case 'IS': 
            properColor = colors.red;
            break;
        case 'IS NOT':
            properColor = colors.green;
            break;
        case 'MAY BE':
            properColor = colors.yellow;
            break;
    }

    return (
        <View style={styles.container}>
            <Text>{result.name}</Text>
            <Barometer value={result.ai_indicator * 100} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>This</Text>
                <Text style={[styles.text, styles.isOrIsNotText, { color: properColor }]}>
                    {isOrIsNotAI(result.ai_indicator)}
                </Text>
                <Text style={styles.text}>AI</Text>
            </View>
        </View>
    )
}