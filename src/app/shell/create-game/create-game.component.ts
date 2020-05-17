import { Component } from '@angular/core';

import { SocketService } from 'services/socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {
    /**
     *
     */
    public NumberRounds: number = 8;

    /**
     *
     */
    public NumberQuestions: number = 5;

    /**
     *
     */
    public PlayerName: string = null;

    /**
     * The Socket IO room being created
     */
    public RoomId: string = '';

    /**
     *
     */
    public WaitingForGame: boolean = false;

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     */
    public constructor(private socketService: SocketService, private router: Router) {}

    /**
     *
     */
    public CreateGame(): void {
        // Attach to the RoomCreated event to handle completion of the call
        // NOTE only the host will be connected to this event
        this.socketService.RoomCreated.subscribe((roomId) => {
            this.RoomId = roomId;
        });

        this.socketService.CreateRoom();

        this.WaitingForGame = true;
    }

    /**
     *
     */
    public NavigateToLobby(): void {
        this.router.navigate(['/lobby']);
    }

    /**
     *
     * @param input
     * @param event
     */
    public CopyToClipboard(input: HTMLInputElement, event: MouseEvent): void {
        event.stopPropagation();

        input.select();
        document.execCommand('copy');
        input.setSelectionRange(0, 0);
    }
}
