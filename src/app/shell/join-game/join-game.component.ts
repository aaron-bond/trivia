import { Component } from '@angular/core';

import { SocketService } from 'services/socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
    /**
     *
     */
    public PlayerName: string = null;

    /**
     * The Socket IO room being joined
     */
    public RoomId: string = '';

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     * @param router The Angular Router service
     */
    public constructor(private socketService: SocketService, private router: Router) {
        this.socketService.RoomJoined.subscribe({
            next: () => this.handleRoomJoined()
        });
    }

    /**
     *
     */
    public JoinGame(): void {
        this.socketService.JoinRoom(this.RoomId);
    }

    /**
     *
     */
    private handleRoomJoined(): void {
        // Set the RoomId so the socketService knows where it is
        this.socketService.RoomId = this.RoomId;

        let information: PlayerInfo = {
            name: this.PlayerName,
            wins: 0,
            played: 0
        };
        this.socketService.ShareInformation(JSON.stringify(information));

        // Redirect to the lobby to show the players
        this.router.navigate(['/lobby']);
    }
}
