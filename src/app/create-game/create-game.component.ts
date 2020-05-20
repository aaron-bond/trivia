import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SocketService, GameService } from 'services';
import { Location } from '@angular/common';

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

    public get JoinRoomShareLink(): string {
        return this.RoomId;
    }

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     */
    public constructor(
        private socketService: SocketService,
        private gameService: GameService,
        private router: Router,
        private location: Location
    ) {}

    /**
     *
     */
    public CreateGame(): void {
        // Attach to the RoomCreated event to handle completion of the call
        // NOTE only the host will be connected to this event
        this.socketService.RoomCreated.subscribe((roomId) => {
            this.RoomId = roomId;

            this.gameService.AddPlayer({
                name: this.PlayerName,
                wins: 0,
                played: 0
            });
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
