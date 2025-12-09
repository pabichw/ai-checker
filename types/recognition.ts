export interface RecognitionResult {
    name: string;
    ai_indicator: number;
}

export interface Media {
    type: "text" | "image"
    text?: string;
    image_base64?: string;
}