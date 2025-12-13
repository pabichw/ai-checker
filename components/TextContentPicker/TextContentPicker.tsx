import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './TextContentPicker.style';

interface TextContentPickerProps {
    value: string;
    disabled?: boolean;
    placeholder?: string;
    onTextChange: (text: string) => void;
}

export function TextContentPicker({ value, onTextChange, placeholder, disabled }: TextContentPickerProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textInputWrapper}>
                <TouchableOpacity
                    style={{opacity: disabled ? 0.5 : 1, flex: 1}}
                    disabled={disabled}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder={placeholder || "Enter text to check..."}
                        value={value}
                        onChangeText={onTextChange}
                        multiline
                        textAlignVertical="top"
                    />
                </TouchableOpacity>
                <Text style={styles.charCount}>{value.length} characters</Text>
            </View>
        </View>
    );
}
