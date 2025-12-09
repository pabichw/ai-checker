import { Animated, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./Section.style";

import PlusIcon from '../../assets/icons/icon-plus.svg';

interface Props {
    title?: string;
    children: React.ReactNode;
    onAdd?: () => void;
    style?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<ViewStyle>;
}

export function Section({ title, onAdd, children, style, headerStyle }: Props) {
  return (
    <Animated.View style={[styles.container, style]}>
      <View style={[styles.header, headerStyle]}>
        {title && <Text style={styles.title}>{title}</Text>}
        {onAdd && (
          <TouchableOpacity style={styles.button} onPress={onAdd}>
            <PlusIcon width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </Animated.View>
  );
}