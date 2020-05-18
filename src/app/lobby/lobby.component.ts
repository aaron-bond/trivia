import { Component } from '@angular/core';

import { SocketService } from 'services/socket.service';
import { GameService } from 'services';

@Component({
    selector: 'lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
    public displayedColumns: string[] = ['name', 'wins', 'played'];

    public get Players(): PlayerInfo[] {
        return this.gameService.Players;
    }

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     */
    public constructor(private socketService: SocketService, private gameService: GameService) {}
}
