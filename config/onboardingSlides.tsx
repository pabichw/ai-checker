import { ReactNode } from 'react';
import { colors } from './styles';
import { WelcomeSlide } from '../components/onboarding/slides/WelcomeSlide/WelcomeSlide';
import { SocialProofSlide } from '../components/onboarding/slides/SocialProofSlide/SocialProofSlide';
import { FeaturesSlide } from '../components/onboarding/slides/FeaturesSlide/FeaturesSlide';

export interface OnboardingSlideProps {
  visible: boolean;
  onNext?: () => void;
}

export interface OnboardingSlide {
  title?: string;
  description?: string;
  image?: string;
  icon?: string;
  glow?: string;
  hideButton?: boolean;
  component?: (props: OnboardingSlideProps) => ReactNode;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    component: (props) => <WelcomeSlide {...props} />,
  },
  {
    glow: colors.green,
    component: (props) => <FeaturesSlide {...props} />,
  },
  {
    glow: colors.primary,
    component: (props) => <SocialProofSlide {...props} />,
  },
];
