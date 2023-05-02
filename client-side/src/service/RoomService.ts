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

    async addPlayerToRoom(roomId: string, playerId: string): Promise<string> {
        let addPlayerToRoom: addPlayerToRoomDTO = {
            roomId: roomId,
            playerId: playerId
        };

        return await fetch(`${this.roomUrl}/addPlayerToRoom`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addPlayerToRoom)
        }).then(response => response.text());
    }
}

export interface RoomDTO {
    roomId: string;
    players: PlayerDTO[];
}

export interface addPlayerToRoomDTO {
    roomId: string;
    playerId: string;
}