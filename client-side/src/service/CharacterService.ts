
import { apiConfig } from "../environment/apiConfig";

export class CharacterService {
    getAllCharacters(): Promise<CharacterDTO[]> {
        return fetch(`${apiConfig.baseUrl}/character`)
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
    characterId?: number;
    characterOrder: number;
    characterSide: string;
    characterName: string;
    characterDescription: string;
    characterAbility: Map<string, boolean>;
}   
