import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService, SocketService } from 'services';

@Component({
    selector: 'join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
    /**
     *
     */
    public PlayerName: string = null;

    /**
     * The Socket IO lobby being joined
     */
    public LobbyId: string = '';

    /**
     * Creates a new instance of the CreateGameComponent
     * @param socketService The Socket IO service wrapper
     * @param router The Angular Router service
     */
    public constructor(
        private socketService: SocketService,
        private gameService: GameService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.socketService.LobbyJoined.subscribe({
            next: () => this.handleLobbyJoined()
        });
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
            next: (paramMap) => {
                let lobbyId = paramMap.get('lobbyId');
                if (lobbyId) {
                    this.LobbyId = lobbyId;
                }
            }
        });
    }

    /**
     *
     */
    public JoinGame(): void {
        this.socketService.JoinLobby(this.LobbyId);
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

    /**
     *
     */
    private handleLobbyJoined(): void {
        // Set the LobbyId so the socketService knows where it is
        this.socketService.LobbyId = this.LobbyId;

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
