import React, { createContext, useContext, useState } from 'react';

interface OnboardingData {
  hourlyRate: number | null;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setHourlyRate: (rate: number) => void;
}

const defaultOnboardingData: OnboardingData = {
  hourlyRate: null,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);

  const setHourlyRate = (rate: number) => {
    setOnboardingData(prev => ({ ...prev, hourlyRate: rate }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, setHourlyRate }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
