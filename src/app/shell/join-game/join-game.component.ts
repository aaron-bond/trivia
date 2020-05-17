import { Component } from '@angular/core';

import { SocketService } from 'services/socket.service';

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
     */
    public constructor(private socketService: SocketService) {}

    /**
     *
     */
    public JoinGame(): void {
        this.socketService.JoinRoom(this.RoomId);
    }
}
