import { apiConfig } from "../environment/apiConfig";

export class PlayerService {

}

export interface PlayerDTO {
    playerId: string;
    userId: string;
    characterId: string;
    isAlive: boolean;
    isSpeakingTurn: boolean;
    voteCount: number;
    votePlayerId: string;
}