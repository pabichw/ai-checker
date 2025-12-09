import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Platform, Modal, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Purchases, { CustomerInfo, LOG_LEVEL } from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';

interface PaywallContextValue {
  showPaywall: (onSuccess?: () => void) => void;
  hidePaywall: () => void;
  isPaywallVisible: boolean;
  customerInfo: CustomerInfo | null;
  isPro: boolean;
}

const PaywallContext = createContext<PaywallContextValue | undefined>(undefined);

interface PaywallProviderProps {
  children: React.ReactNode;
}

export const PaywallProvider: React.FC<PaywallProviderProps> = ({ children }) => {
  const closeBtnOpacityRefAnim = useRef(new Animated.Value(0));

  const [isPaywallVisible, setIsPaywallVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | undefined>();
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [unlockedCloseButton, setUnlockedCloseButton] = useState(false);
  const [closeActiveTimeout, setCloseActiveTimeout] = useState<number>(5);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const initializeRevenueCat = async () => {
      try {
        Purchases.setLogLevel(LOG_LEVEL.ERROR);

        const apiKey = Platform.OS === 'ios'
          ? process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY
          : process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY;

        if (!apiKey) {
          console.warn('RevenueCat API key not found - paywall will not work');
          return;
        }

        if (Platform.OS === 'ios') {
          Purchases.configure({ apiKey });
        } else if (Platform.OS === 'android') {
          Purchases.configure({ apiKey });
        }

        // Fetch customer info after successful configuration
        const info = await Purchases.getCustomerInfo();
        setCustomerInfo(info);

      } catch (error) {
        console.error('Failed to initialize RevenueCat:', error);
      }
    };

    Purchases.isConfigured().then((configured) => {
      if (!configured) {
        initializeRevenueCat();
      }
    }).catch((error) => {
      console.error('Failed to check if RevenueCat is configured:', error);
    });
  }, []);

  useEffect(() => {
    console.log('showCloseButton:', showCloseButton, 'closeActiveTimeout:', closeActiveTimeout);
    if (showCloseButton) {
      timerRef.current = setInterval(() => {
        if (closeActiveTimeout <= 1) {
          setCloseActiveTimeout(0);
          setUnlockedCloseButton(true);
          
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } else {
          setCloseActiveTimeout(prev => Math.max(0, prev - 1));
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showCloseButton, closeActiveTimeout])

  const showPaywall = useCallback((onSuccess?: () => void) => {
    setOnSuccessCallback(() => onSuccess);
    setIsPaywallVisible(true);
    setShowCloseButton(false);
  }, []);

  const hidePaywall = useCallback(() => {
    Animated.timing(closeBtnOpacityRefAnim.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsPaywallVisible(false);
    setOnSuccessCallback(undefined);
    setShowCloseButton(false);
  }, []);

  // Show close button after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPaywallVisible) {
      // start hidden, then fade in
      closeBtnOpacityRefAnim.current.setValue(0);
      setCloseActiveTimeout(5);

      timer = setTimeout(() => {
        Animated.timing(closeBtnOpacityRefAnim.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setShowCloseButton(true);
      }, 4000);
    } else {
      closeBtnOpacityRefAnim.current.setValue(0); 
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPaywallVisible]);

  const handleDismiss = useCallback(() => {
    if (onSuccessCallback) {
      onSuccessCallback();
    }

    hidePaywall();
  }, [onSuccessCallback, hidePaywall]);

  const handlePurchaseCompleted = useCallback(async (customerInfo: CustomerInfo) => {
    setCustomerInfo(customerInfo);

    if (onSuccessCallback) {
      onSuccessCallback();
    }

    hidePaywall();
  }, [onSuccessCallback, hidePaywall]);

  const handleRestoreCompleted = useCallback(async (customerInfo: CustomerInfo) => {
    setCustomerInfo(customerInfo);

    if (onSuccessCallback) {
      onSuccessCallback();
    }
    hidePaywall();
  }, [onSuccessCallback, hidePaywall]);

  console.log('🧑🏼 customerInfo:', customerInfo);
  console.log('⭐️ entitlements:', customerInfo?.entitlements);
  
  const isPro = customerInfo?.entitlements.active['Pro'] !== undefined;

  const value: PaywallContextValue = {
    showPaywall,
    hidePaywall,
    isPaywallVisible,
    customerInfo,
    isPro,
  };

  return (
    <PaywallContext.Provider value={value}>
      {children}
      {isPaywallVisible && (
        <Modal
          visible={true}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={() => {
            // Prevent dismissal - this is a hard paywall
            console.log('Paywall dismiss blocked - hard paywall mode');
          }}
        >
          <RevenueCatUI.Paywall
            options={{
              displayCloseButton: false,
            }}
            onDismiss={() => handleDismiss()}
            onPurchaseCompleted={({customerInfo}) => handlePurchaseCompleted(customerInfo)}
            onRestoreCompleted={({customerInfo}) => handleRestoreCompleted(customerInfo)}
          />

          {/* close button */}
          <Animated.View style={[paywallStyles.closeButtonWrapper, { opacity: closeBtnOpacityRefAnim.current }]}>
            <TouchableOpacity
              style={[paywallStyles.closeButton]}
              onPress={() => handleDismiss()}
              disabled={!unlockedCloseButton}
            >
              <Text style={[paywallStyles.closeButtonText, closeActiveTimeout ? {} : paywallStyles.xText]}>{closeActiveTimeout || '×'}</Text>
            </TouchableOpacity>
          </Animated.View>

        </Modal>
      )}
    </PaywallContext.Provider>
  );
};

export const usePaywall = (): PaywallContextValue => {
  const context = useContext(PaywallContext);
  if (!context) {
    throw new Error('usePaywall must be used within a PaywallProvider');
  }
  return context;
};

const paywallStyles = StyleSheet.create({
  closeButtonWrapper: {
    position: 'absolute',
    top: 60,
    right: 25,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 32,
    height: 32,
    borderRadius: 99,
    alignItems: 'center',
  },
  closeButtonText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '600',
    inset: 0,
    top: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  },
  xText: {
    top: 0,
  },
});
