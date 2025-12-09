import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#1e50cfff',
  primaryDark: '#173fa3ff',
  primaryFade: '#4e70c6ff',
  secondary: '#4ec2cdff',
  secondaryDark: '#3c969eff',
  background: '#f1f1f1',
  text: '#1e1e1e',
  textSecondary: '#7e7e7eff',
  textMuted: '#1e1e1e3b',
  border: '#4a5568',
  shadow: '#000',
  whiteDark: '#a3a3a3',
  offwhite: '#f5f5f5',

  green: '#4CAF50',
  lightgreen: '#CDDC39',
  yellow: '#ffd700',
  gold: '#cdcd4e',
  goldDark: '#a9a941ff',
  orange: '#FF9800',
  red: '#F44336',
};

export const spacing = {
  xxs: 5,
  xs: 10,
  sm: 16,
  md: 24,
  lg: 30,
  xl: 40,
  xxl: 60,
  "3xl": 90,
  "4xl": 120,
};

export const borderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 50,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  mixingTable: {
    width: '100%',
    backgroundColor: colors.secondaryDark,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.medium,
  },
  trackContainer: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  trackName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: 'bold',
  },
  slider: {
    width: 250,
    height: 40,
  },
  masterButton: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
    marginBottom: spacing.md,
  },
  masterButtonText: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    lineHeight: 36,
  },
  statusText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  tabIcon: {
  },
});