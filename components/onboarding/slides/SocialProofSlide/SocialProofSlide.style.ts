import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../config/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    opacity: 0.6,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  carouselWrapper: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    height: 260,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    fontSize: 32,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: 4,
  },
  star: {
    fontSize: 16,
  },
  reviewText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: spacing.md,
    opacity: 0.9,
  },
  nickname: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  note: {
    opacity: 0.6,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  }
});
