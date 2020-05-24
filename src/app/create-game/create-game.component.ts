import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SocketService, GameService } from 'services';

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
     * The Socket IO lobby being created
     */
    public LobbyId: string = '';

    /**
     *
     */
    public get JoinLobbyShareLink(): string {
        // TODO use proper Location URL builder
        return window.location.protocol + window.location.host + '/join/' + this.LobbyId;
    }

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     */
    public constructor(private socketService: SocketService, private gameService: GameService, private router: Router) {}

    /**
     *
     */
    public CreateGame(): void {
        // Attach to the LobbyCreated event to handle completion of the call
        // NOTE only the host will be connected to this event
        this.socketService.LobbyCreated.subscribe((lobbyId) => {
            this.LobbyId = lobbyId;

            this.gameService.AddPlayer({
                name: this.PlayerName,
                wins: 0,
                played: 0
            });

            this.router.navigate(['/lobby']);
        });

        this.socketService.CreateLobby();
    }

    /**
     *
     */
    public HandleOverlayClick(event: MouseEvent): void {
        let element = event.target as HTMLElement;

        // only hide the modal if the click came from the background behind the dialog
        if (element.classList.contains('modal-overlay')) {
            this.router.navigate(['/']);
        }
    }
}
