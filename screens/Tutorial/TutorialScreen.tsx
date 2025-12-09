import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AnimatedScreen } from '../../components';
import { styles } from './TutorialScreen.style';
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

export default function TutorialScreen() {
    const navigation = useNavigation();

    return (
        <AnimatedScreen>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>How to get better results</Text>
                <Text style={styles.subtitle}>Follow these simple tips for the best results</Text>

                <View style={styles.stepsContainer}>
                    {/* Step 1 */}
                    <View style={styles.step}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Frame the Entire Object</Text>
                            <Text style={styles.stepDescription}>
                                Make sure the whole item is visible from top to bottom.
                                Capture the complete object so we can identify it accurately.
                            </Text>
                        </View>
                    </View>

                    {/* Step 2 */}
                    <View style={styles.step}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Use Good Lighting</Text>
                            <Text style={styles.stepDescription}>
                                Take photos in well-lit conditions. Natural light works best.
                                Avoid harsh shadows or dark areas that obscure details.
                            </Text>
                        </View>
                    </View>

                    {/* Step 3 */}
                    <View style={styles.step}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Keep Background Simple</Text>
                            <Text style={styles.stepDescription}>
                                Use a clean, uncluttered background. This helps our AI
                                focus on the item and identify it more accurately.
                            </Text>
                        </View>
                    </View>

                    {/* Step 4 */}
                    <View style={styles.step}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>4</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Hold Phone Steady</Text>
                            <Text style={styles.stepDescription}>
                                Keep your phone steady while taking the photo. This helps our AI
                                focus on the item and identify it more accurately.
                            </Text>
                        </View>
                    </View>

                </View>

                <Button type="faded" onPress={() => navigation.goBack()}>
                    Got it!
                </Button>
            </ScrollView>
        </AnimatedScreen>
    );
}
