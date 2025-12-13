import { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Animated, Easing, Text, Image } from 'react-native';
import { usePostHog } from 'posthog-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useHaptic } from '../../hooks/useHaptic';
import { styles } from './OnboardingScreen.style';
import { onboardingSlides, OnboardingSlide } from '../../config/onboardingSlides';
import TermsAndPrivacy from '../../components/TermsAndPrivacy';
import Button from '../../components/ui/Button';
import { TreeGlow } from '../../components/TreeGlow';
import { usePaywall } from '../../context/PaywallContext';

import IconBack from '../../assets/icons/icon-back.svg';

const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const navigation = useNavigation();
  const { showPaywall } = usePaywall();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const haptic = useHaptic();
  const posthog = usePostHog();
  const isDev = process.env.EXPO_PUBLIC_ENV === 'dev';

  useEffect(() => {
    // Track onboarding slide view
    const currentSlide = onboardingSlides[currentIndex];
    posthog?.capture('ONBOARDING_SLIDE_VIEWED', {
      slide_index: currentIndex,
      slide_title: currentSlide.title || null,
      has_component: !!currentSlide.component,
      total_slides: onboardingSlides.length,
    });

    // Disable button when changing slides
    setIsButtonEnabled(false);
    buttonAnim.setValue(0);

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: currentIndex + 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.quad)
    }).start();


    // Enable button after timeout
    const timeout = setTimeout(() => {
      setIsButtonEnabled(true);
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.quad)
      }).start();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    haptic.impactAsync(haptic.ImpactFeedbackStyle.Light);

    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      showPaywall(completeOnboarding);
    }
  };

  const handlePrev = () => {
    haptic.impactAsync(haptic.ImpactFeedbackStyle.Light);

    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      onComplete();
      navigation.navigate('MainApp' as never);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
    const isActive = index === currentIndex;
    const Component = item.component;
    
    return (
      <View style={styles.slide}>
        {item.image && (
          <View
            style={[
              styles.iconContainer,
            ]}
          >
            <Image source={item.image} style={{ width: 120, height: 120 }} />
          </View>
        )}
        {item.icon && (
          <View
            style={styles.iconContainer}
          >
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
        )}
        {item.title && (
          <Text
            style={styles.title}
          >
            {item.title}
          </Text>
        )}
        {item.description && (
          <Text
            style={styles.description}
          >
            {item.description}
          </Text>
        )}
        {item.component && (
          <View style={styles.componentContainer}>
            {Component && <Component visible={isActive} onNext={handleNext} />}
          </View>
        )}
        {item.glow && (
          <View style={styles.treeGlowContainer}>
            <TreeGlow glowColor={item.glow} />
          </View>
        )}
      </View>
    );
  };

  const renderPagination = () => {
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, onboardingSlides.length],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.pagination}>
        <TouchableOpacity style={[styles.goBackButton,  { display: currentIndex === 0 ? 'none' : 'flex' }]}  onPress={handlePrev} accessibilityLabel="Previous slide" disabled={currentIndex === 0}>
          <IconBack width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.progressBarWrapper}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
        <View style={styles.paginationTextContainer}>
          <Text style={styles.paginationText}>{currentIndex + 1} / {onboardingSlides.length}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => `slide-${index}`}
      />

      {renderPagination()}

      <View style={styles.buttonContainer} pointerEvents="box-none">
        {!onboardingSlides[currentIndex]?.hideButton && (
          <>
            <Button onPress={handleNext} disabled={!isButtonEnabled}>
                {currentIndex === onboardingSlides.length - 1 || currentIndex === 0 ? 'Get Started' : 'Next'}
            </Button>
          </>
        )}

        {currentIndex === 0 && <View style={styles.termsAndPrivacy}><TermsAndPrivacy /></View>}

        {/* Useful for debugging */}
        {/* {isDev && <TouchableOpacity onPress={completeOnboarding}>
            <Text style={{ textAlign: 'center' }}>Skip</Text>
        </TouchableOpacity>} */}
      </View>
    </View>
  );
};

export { ONBOARDING_COMPLETED_KEY };
