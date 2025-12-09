import { StyleSheet } from 'react-native';
import { spacing } from '../config/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(0, 0, 0)',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    flex: 1,
    paddingBlockStart: 100, // Account for navbar height
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.md,
    paddingBottom: 100, // Account for bottom navigation height
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  topActionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topActionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xxl,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  noBgButton: {
    padding: 10,
  },
  drawer: {
    paddingHorizontal: 20,
    paddingBlock: 30,
  },
  hiddenLayoutAction: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 1,
  },
  hiddenLayoutActionInner: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});