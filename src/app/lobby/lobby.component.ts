import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SocketService, GameService } from 'services';

@Component({
    selector: 'lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
    /**
     *
     */
    public displayedColumns: string[] = ['host', 'name', 'wins', 'played'];

    /**
     *
     */
    public get Players(): PlayerInfo[] {
        return this.gameService.Players;
    }

    /**
     *
     */
    public get LobbyId(): string {
        return this.socketService.LobbyId;
    }

    /**
     *
     */
    public get JoinLobbyShareLink(): string {
        // TODO use proper Location URL builder
        return window.location.protocol + window.location.host + '/join/' + this.LobbyId;
    }

    /**
     * Creates a new instance of the LobbyComponent
     * @param socketService
     * @param gameService
     * @param router
     * @param activatedRoute
     */
    public constructor(private socketService: SocketService, private gameService: GameService, private router: Router) {
        // If the LobbyId isn't set, it means that the lobby isn't initialised, so send user back to root
        if (!this.socketService.LobbyId) {
            this.router.navigate(['/']);
            return;
        }

        // Turn off the splash screen now that we've loaded
        this.gameService.ShowSplashScreen = false;
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
