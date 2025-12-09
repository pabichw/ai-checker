import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './FeaturesSlide.style';
import { useFadeIn } from '../../../../hooks/animations/useFadeIn';
import { OnboardingSlideProps } from '../../../../config/onboardingSlides';
import { colors } from '../../../../config/styles';

interface Feature {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'pricetag',
    title: 'Check Item Price',
    description: 'Get instant price estimates for any item with just a photo',
  },
  {
    icon: 'flash',
    title: 'Quick & Easy',
    description: 'Simple snap-and-check process that takes seconds',
  },
  {
    icon: 'calculator',
    title: 'AI-powered',
    description: 'Powered by advanced AI for reliable price information',
  },
];

interface Props extends OnboardingSlideProps {}

export const FeaturesSlide = ({ visible }: Props) => {
  const fadeInTitleStyle = useFadeIn({ visible, delay: 0, initYPos: 20 });
  const fadeInFeature1Style = useFadeIn({ visible, delay: 300, initYPos: 20 });
  const fadeInFeature2Style = useFadeIn({ visible, delay: 500, initYPos: 20 });
  const fadeInFeature3Style = useFadeIn({ visible, delay: 700, initYPos: 20 });

  const featureStyles = [fadeInFeature1Style, fadeInFeature2Style, fadeInFeature3Style];

  return (
    <View style={styles.container}>
      <Animated.View style={fadeInTitleStyle}>
        <Text style={styles.title}>Why AI Checker?</Text>
        <Text style={styles.subtitle}>Everything you need for smart pricing</Text>
      </Animated.View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Animated.View key={index} style={[styles.featureCard, featureStyles[index]]}>
            <View style={styles.iconContainer}>
              <Ionicons name={feature.icon} size={20} color={colors.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};
