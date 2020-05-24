import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService, SocketService } from 'services';

@Component({
    selector: 'shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
    /**
     * Whether the full-screen splash is displayed
     * By default, the shell overlay is displayed and then dismissed with some action
     */
    public get ShowSplashScreen(): boolean {
        return this.gameService.ShowSplashScreen;
    }

    /**
     * Creates a new instance of the ShellCommponent
     * @param gameService
     * @param socketService
     */
    public constructor(private gameService: GameService, private socketService: SocketService, private router: Router) {
        this.socketService.LobbyClosed.subscribe({
            next: () => this.handleLobbyClosed()
        });
    }

    /**
     *
     */
    private handleLobbyClosed(): void {
        this.gameService.ShowSplashScreen = true;
        this.router.navigate(['/']);
    }
}
