import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../../config/styles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    flex: 1,
    width: '100%',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: 120,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: colors.whiteDark,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: spacing.md,
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    gap: spacing.xs,
    top: 60,
    left: spacing.lg,
    right: spacing.lg,
    height: 40,
  },
  goBackButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: spacing.xxs,
  },
  progressBarWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 4,
    flex: 1,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: colors.primary,
    height: 4,
    borderRadius: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1,
  },
  skipButtonText: {
    color: colors.whiteDark,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  termsAndPrivacy: {
    position: 'absolute',
    bottom: -32,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  treeGlowContainer: {
    position: 'absolute',
    bottom: -280,
    left: -50,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    transform: [{ scale: 1.5 }],
    zIndex: -1,
  },
  paginationTextContainer: {
  },
  paginationText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
