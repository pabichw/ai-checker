import { Text, View } from "react-native";
import { LimitResponseDto } from "../../types/api";
import styles from "./LimitDisplay.style";
import Button from "../ui/Button";
import IconCrownWhite from "../../assets/icons/icon-crown_white.svg";
import { usePaywall } from "../../context/PaywallContext";

interface LimitDisplayProps {
    limit: LimitResponseDto | null;
    loading?: boolean;
}

export default function LimitDisplay({ limit, loading }: LimitDisplayProps) {
    const { isPro, showPaywall } = usePaywall();
    
    const usesLeft = (): string | number => {
        if (loading) return 'Loading...';
        if (isPro) return 'Unlimited';
        if (!limit || !limit.limit) return '---';
        return limit.limit - limit.used;
    };

    const tier = (): string => {
        if (!limit || isPro) {
            return ''
        }
        
        return '(Free Tier)'  
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Uses left: </Text>
                    <Text style={styles.textBold}>{usesLeft()} </Text>
                    <Text style={styles.text}>{tier()}</Text>
                </View>
                <Button 
                    onPress={() => showPaywall()} 
                    height={26} 
                    style={{ top: 2, width: 100,  padding: 0 }} 
                    icon={<IconCrownWhite width={15} height={15} />}
                    disabled={isPro}
                >
                    <Text style={{fontSize: 10}}>{isPro ? 'Premium' : 'Go Premium'}</Text>
                </Button>
            </View>
        </View>
    );
}
