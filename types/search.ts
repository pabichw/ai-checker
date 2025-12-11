import { RecognitionResult } from "./recognition";

export interface SearchHistoryItem {
    id: string;
    imageUri?: string;
    textContent?: string;
    result: RecognitionResult;
    timestamp: number;
}
