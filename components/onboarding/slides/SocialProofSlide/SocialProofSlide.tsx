import { View, Text, Animated, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { styles } from './SocialProofSlide.style';
import { useFadeIn } from '../../../../hooks/animations/useFadeIn';
import { OnboardingSlideProps } from '../../../../config/onboardingSlides';
import Braggadocio from '../../../braggadocio/Braggadocio';

const avatars: ImageSourcePropType[] = [
  // placeholders
  require('../../../../assets/images/mascot/meditating.png'), 
  require('../../../../assets/images/people/anon.jpg'), 

  // female
  require('../../../../assets/images/people/female-1.jpg'), 
  require('../../../../assets/images/people/female-3.jpg'), 

  // male
  require('../../../../assets/images/people/male-1.jpg'), 
];

const { width } = Dimensions.get('window');

interface Review {
  id: string;
  nickname: string;
  rating: number;
  review: string;
  avatar: string | ImageSourcePropType;
}

const reviews: Review[] = [
  {
    id: '1',
    nickname: 'Sara',
    rating: 5,
    review: 'Super accurate at detecting AI-generated content. Saved me from sharing a fake article!',
    avatar: avatars[3],
  },
  {
    id: '2',
    nickname: 'johnath1997',
    rating: 5,
    review: 'I use this daily to verify if images and text are AI-generated. Works like a charm!',
    avatar: avatars[4],
  },
  {
    id: '3',
    nickname: 'Emma L.',
    rating: 5,
    review: 'Finally an app that can tell if a viral post was made by AI. Essential tool for journalists and content creators to verify authenticity! <3',
    avatar: avatars[2],
  },
  {
    id: '4',
    nickname: 'Anonymous',
    rating: 5,
    review: 'Fantastic app! Helped me identify AI-generated photos in seconds.',
    avatar: avatars[1],
  },
];

interface Props extends OnboardingSlideProps {}

export const SocialProofSlide = ({ visible }: Props) => {
  const fadeInTitleStyle = useFadeIn({ visible, delay: 0, initYPos: 20 });
  const fadeInBraggadocioStyle = useFadeIn({ visible, delay: 500, initYPos: 20 });
  const fadeInCarouselStyle = useFadeIn({ visible, delay: 1000, initYPos: 20 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(rating)].map((_, index) => (
          <Text key={index} style={styles.star}>⭐</Text>
        ))}
      </View>
    );
  };

  const renderReview = (item: Review) => (
    <View style={styles.reviewCard}>
      <View style={styles.avatarContainer}>
        {typeof item.avatar === 'string' ? (
          <Text style={styles.avatar}>{item.avatar}</Text>
        ) : (
          <Image source={item.avatar} style={styles.avatarImage} />
        )}
      </View>
      {renderStars(item.rating)}
      <Text style={styles.reviewText}>{item.review}</Text>
      <Text style={styles.nickname}>{item.nickname}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={fadeInTitleStyle}>
        <Text style={styles.title}>Trusted by thousands</Text>
        <Text style={styles.subtitle}>Join users who verify AI content daily</Text>
      </Animated.View>

      <Animated.View style={fadeInBraggadocioStyle}>
        <Braggadocio size={100} />
      </Animated.View>

      <Animated.View style={[styles.carouselWrapper, fadeInCarouselStyle]} pointerEvents="box-none">
        <Carousel
          width={width}
          height={250}
          data={reviews}
          renderItem={({ item }) => renderReview(item)}
          onSnapToItem={(index) => setCurrentIndex(index)}
          autoPlay
          loop
          autoPlayInterval={5000}
          scrollAnimationDuration={1000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
        />

        <View style={styles.pagination} pointerEvents="none">
          {reviews.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        
        <Text style={styles.note}>Based on App Store reviews, social media and user feedback</Text>
      </Animated.View>
    </View>
  );
};
