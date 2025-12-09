import { RecognitionResult } from "./recognition";

export interface SearchHistoryItem {
    id: string;
    imageUri: string;
    result: RecognitionResult;
    timestamp: number;
}
