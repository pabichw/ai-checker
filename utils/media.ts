import * as FileSystem from "expo-file-system/legacy";

export const imageToBase64 = async (imageUri: string): Promise<string> => {
    console.log('imageUri', imageUri);
    const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: "base64" });
    console.log('base64', base64Image);
    const dataUri = `data:image/jpeg;base64,${base64Image}`;
    
    return dataUri;
}