import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  StyleProp,
  ViewProps,
} from 'react-native';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  backgroundScale?: Animated.Value;
  title?: string;
  subtitle?: string;
  style?: StyleProp<ViewProps>
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Drawer: React.FC<DrawerProps> = ({
  isVisible,
  onClose,
  children,
  backgroundScale,
  style,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const currentAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Cancel any ongoing animation
    if (currentAnimationRef.current) {
      currentAnimationRef.current.stop();
    }

    if (isVisible) {
      slideAnim.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
      if (backgroundScale) {
        backgroundScale.setValue(1);
      }

      const animations = [
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ];

      if (backgroundScale) {
        animations.push(
          Animated.spring(backgroundScale, {
            toValue: 0.92,
            tension: 65,
            friction: 11,
            useNativeDriver: true,
          })
        );
      }

      currentAnimationRef.current = Animated.parallel(animations);
      currentAnimationRef.current.start(() => {
        currentAnimationRef.current = null;
      });
    } else {
      const animations = [
        Animated.spring(slideAnim, {
          toValue: SCREEN_HEIGHT,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ];

      if (backgroundScale) {
        animations.push(
          Animated.spring(backgroundScale, {
            toValue: 1,
            tension: 65,
            friction: 11,
            useNativeDriver: true,
          })
        );
      }

      if (backgroundScale) {
        backgroundScale.setValue(1);
      }

      currentAnimationRef.current = Animated.parallel(animations);
      currentAnimationRef.current.start(() => {
        currentAnimationRef.current = null;
      });
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacity }
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateY: slideAnim }],
            },
            style,
          ]}
        >
          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 400,
    maxHeight: SCREEN_HEIGHT * 0.8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});