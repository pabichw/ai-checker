import { LimitResponseDto } from "../types/api";
import { Media, RecognitionResult } from "../types/recognition";

export const recognitionService = {
    uploadMedia: async (
        media: Media[],
        isPro: boolean
    ): Promise<RecognitionResult | null> => {
        console.log('uploadMedia', media);

        // TODO: extract to api instance or smth
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/content-recognition`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Api-Secret': isPro ? process.env.EXPO_PUBLIC_API_SECRET : 'public',
                'X-Auth-Token': process.env.EXPO_PUBLIC_API_AUTH_TOKEN,
            },
            body: JSON.stringify({
                media
            }),
        }).then(data => data.json());

        if (response.error) {
            throw response;
        }

        return response as RecognitionResult;
    },

    getLimit: async (isPro: boolean): Promise<LimitResponseDto> => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/content-recognition/limit`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-Api-Secret': isPro ? process.env.EXPO_PUBLIC_API_SECRET : 'public',
                'X-Auth-Token': process.env.EXPO_PUBLIC_API_AUTH_TOKEN,
            },
        }).then(data => data.json());

        if (response.error) {
            throw response;
        }

        return response as LimitResponseDto;
    }
}