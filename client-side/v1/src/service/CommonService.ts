import { apiConfig } from "../environment/apiConfig";

export class CommonService {
    async fetchMp3File(): Promise<Blob> {
        const response = await fetch(`${apiConfig.baseUrl}/audio`, {
            method: 'GET',
            headers: {
                'Content-Type': 'audio/mp3'
            }
        });
        const blob = await response.blob();
        return blob;
    }

}