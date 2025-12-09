import { Dimensions } from "react-native";
import { AnimatedScreen } from "../../components";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./HomeScreen.style";
import { spacing } from "../../config/styles";

export const width = Dimensions.get('window').width;

export default function HomeScreen() {
    return (
        <AnimatedScreen>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: spacing.md }}>
                <ImageUpload />
            </ScrollView>
        </AnimatedScreen>
    );
}