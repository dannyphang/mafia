import { apiConfig } from "../environment/apiConfig";

export class PlayerService {
    playerUrl: string = `${apiConfig.baseUrl}/player`;

    async createNewPlayer(player: PlayerDTO): Promise<PlayerDTO> {
        return await fetch(`${this.playerUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
            .then(response => response.json());
    }

    // delete player
    async deletePlayer(playerId: string): Promise<string> {
        return await fetch(`${this.playerUrl}/${playerId}`, {
            method: 'DELETE'
        }).then(response => response.text());
    }

    async getPlayerListByRoomId(id: String): Promise<PlayerDTO[]> {
        return await fetch(`${this.playerUrl}/getPlayerListByRoomId/${id}`, {
            method: 'GET'
        })
            .then(response => response.json());
    }

    // update player
    async updatePlayer(playerId: string, player: PlayerDTO): Promise<PlayerDTO> {
        return await fetch(`${this.playerUrl}/${playerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
            .then(response => response.json());
    }
}

export interface PlayerDTO {
    playerId: string;
    name: string;
    characterId: string;
    alive: boolean;
    killed: boolean;
    protected: boolean;
}