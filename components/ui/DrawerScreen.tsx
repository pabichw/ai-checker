import React, { useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import { Drawer } from './Drawer';

interface DrawerScreenProps {
  children: React.ReactNode;
  drawerContent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isDrawerVisible: boolean;
  onDrawerClose: () => void;
}

export const DrawerScreen: React.FC<DrawerScreenProps> = ({
  children,
  drawerContent,
  isDrawerVisible,
  onDrawerClose,
  style
}) => {
  const backgroundScale = useRef(new Animated.Value(1)).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ scale: backgroundScale }]
        }}
      >
        {children}
      </Animated.View>

      <Drawer
        isVisible={isDrawerVisible}
        onClose={onDrawerClose}
        backgroundScale={backgroundScale}
        style={style}
      >
        {drawerContent}
      </Drawer>
    </View>
  );
};