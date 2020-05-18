import { Component } from '@angular/core';

import { SocketService } from 'services/socket.service';
import { GameService } from 'services';
import { Router } from '@angular/router';

@Component({
    selector: 'lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
    public displayedColumns: string[] = ['host', 'name', 'wins', 'played'];

    public get Players(): PlayerInfo[] {
        return this.gameService.Players;
    }

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     */
    public constructor(private socketService: SocketService, private gameService: GameService, private router: Router) {
        // If the RoomId isn't set, it means that the lobby isn't initialised, so send user back to root
        if (!this.socketService.RoomId) {
            this.router.navigate(['/']);
        }
    }
}
