import { View, TouchableOpacity, Image, Alert, ActionSheetIOS, Platform, Text } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./PhotoPicker.style";
import { colors } from "../../config/styles";

interface PhotoPickerProps {
    imageUri?: string | null;
    onImageSelected?: (uri: string | null) => void;
}

export const PhotoPicker = ({ imageUri, onImageSelected }: PhotoPickerProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(imageUri ?? null);

    useEffect(() => {
        setSelectedImage(imageUri ?? null);
    }, [imageUri]);

    const handleReset = () => {
        setSelectedImage(null);
        onImageSelected?.(null);
    };

    const pickImageFromLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            onImageSelected?.(uri);
        }
    };

    const pickImageFromCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            onImageSelected?.(uri);
        }
    };

    const showImagePickerOptions = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        pickImageFromCamera();
                    } else if (buttonIndex === 2) {
                        pickImageFromLibrary();
                    }
                }
            );
        } else {
            Alert.alert(
                'Add Photo',
                'Choose an option',
                [
                    { text: 'Take Photo', onPress: pickImageFromCamera },
                    { text: 'Choose from Library', onPress: pickImageFromLibrary },
                    { text: 'Cancel', style: 'cancel' },
                ],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={styles.container}>
            {selectedImage ? (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.selectedImage}
                    />
                    
                    {/* Remove photo */}
                    <TouchableOpacity
                        style={styles.removePhotoButton}
                        onPress={handleReset}
                    >
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.photoButton}
                    onPress={showImagePickerOptions}
                >
                    <Text style={styles.sectionTitle}>
                        Add Photo
                    </Text>
                    <Ionicons name="camera" size={64} color={colors.text} opacity={0.8} />
                </TouchableOpacity>
            )}
        </View>
    );
};
