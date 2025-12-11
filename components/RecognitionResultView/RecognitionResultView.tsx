import { Text, View } from "react-native";
import Barometer from "../Barometer/Barometer";
import { RecognitionResult } from "../../types/recognition";
import styles from "./RecognitionResultView.style";
import { colors } from "../../config/styles";

interface Props {
    result: Partial<RecognitionResult>
}

export enum RecognitionStatus {
    IS = 'IS',
    IS_NOT = 'IS NOT',
    MAY_BE = 'MAY BE'
}


export const isOrIsNotAI = (value: number): RecognitionStatus => {
    if (value >= 0.60) {
        return RecognitionStatus.IS
    } else if (value > 0.40 && value < 0.60) {
        return RecognitionStatus.MAY_BE
    } else {
        return RecognitionStatus.IS_NOT
    }
}

export const colorPick = (status: RecognitionStatus) => {
    switch (status) {
        case RecognitionStatus.IS:
            return colors.red;
        case RecognitionStatus.MAY_BE:
            return colors.yellow;
        case RecognitionStatus.IS_NOT:
            return colors.green;
    }
}

export default function ({ result }: Props) {
    const is = isOrIsNotAI(result.ai_indicator ?? 0);

    console.log('ai_indicator', result.ai_indicator);

    return (
        <View style={styles.container}>
            <Text>{result.name}</Text>
            <Barometer value={(result.ai_indicator ?? 0) * 100} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>This</Text>
                <Text style={[styles.text, styles.isOrIsNotText, { color: colorPick(is) }]}>
                    {is}
                </Text>
                <Text style={styles.text}>AI</Text>
            </View>
        </View>
    )
}