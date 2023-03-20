import { apiConfig } from "../environment/apiConfig";
import { PlayerDTO } from "./PlayerService";

export class RoomService {
    roomUrl: string = `${apiConfig.baseUrl}/room`;

    async createNewRoom(): Promise<RoomDTO> {
        return await fetch(`${this.roomUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json());
    }

    async getRoomById(id: String): Promise<RoomDTO> {
        return await fetch(`${this.roomUrl}/${id}`)
            .then(response => response.json());
    }


}

export interface RoomDTO {
    roomId: string;
    players: PlayerDTO[];
} 