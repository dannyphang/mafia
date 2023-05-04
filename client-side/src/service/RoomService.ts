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
        let playerRoom: playerRoomDTO = {
            roomId: roomId,
            playerId: playerId
        };

        return await fetch(`${this.roomUrl}/addPlayerToRoom`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerRoom)
        }).then(response => response.text());
    }

    async deletePlayerFromRoom(roomId: string, playerId: string): Promise<string> {
        let playerRoom: playerRoomDTO = {
            roomId: roomId,
            playerId: playerId
        };

        return await fetch(`${this.roomUrl}/deletePlayerFromRoom`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerRoom)
        }).then(response => response.text());
    }

    async updateRoom(room: RoomDTO): Promise<RoomDTO> {
        return await fetch(`${this.roomUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        }).then(response => response.json());
    }
}

export interface RoomDTO {
    roomId: string;
    playerIdList: string[];
    nightTime: boolean;
    dayTime: boolean;
    gameStart: boolean;
    preparationTime: boolean;
    gameTurn: number;
}

export interface playerRoomDTO {
    roomId: string;
    playerId: string;
}