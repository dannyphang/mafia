
import { apiConfig } from "../environment/apiConfig";

export class CharacterService {
    async getAllCharacters(): Promise<CharacterDTO[]> {
        return await fetch(`${apiConfig.baseUrl}/character`)
            .then(response => response.json());
    }

    async getCharacterById(characterId: string): Promise<CharacterDTO> {
        return await fetch(`${apiConfig.baseUrl}/character/${characterId}`)
            .then(response => response.json());
    }

    async createCharacter(character: CharacterDTO): Promise<CharacterDTO> {
        const response = await fetch(`${apiConfig.baseUrl}/character`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        });
        return await response.json();
    }
}

export interface CharacterDTO {
    characterId?: string;
    characterOrder: number;
    characterSide: string;
    characterName: string;
    characterDescription: string;
    characterAbility: Record<string, boolean>;
}   
