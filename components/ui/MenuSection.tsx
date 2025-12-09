import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MenuSection.style";
import { spacing } from "../../config/styles";

export const MenuSections = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <View style={styles.options}>{children}</View>
        </View>
    );
};

export const MenuSectionOption = ({
    title,
    component,
    icon,
    onPress,
    highlighted = false,
    isLast = false,
}: {
    title: string;
    component?: React.ReactNode;
    icon?: React.ReactNode;
    onPress?: () => void;
    highlighted?: boolean;
    isLast?: boolean;
}) => {
    const Wrapper = component ? View : TouchableOpacity;

    return (
        <Wrapper
            style={[
                styles.option,
                highlighted && styles.optionHighlighted,
                !isLast && {
                    borderBottomWidth: 1,
                    paddingBlockEnd: spacing.sm,
                    marginBottom: spacing.sm,
                }
            ]}
            onPress={onPress}
        >
            <View style={styles.optionMain}>
                {icon && icon}
                <Text style={[
                    styles.optionText,
                    highlighted && styles.optionTextHighlighted
                ]}>
                    {title}
                </Text>
            </View>
            {component && component}
        </Wrapper>
    );
};