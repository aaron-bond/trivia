import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { SocketService } from 'services/socket.service';
import { Router, NavigationEnd } from '@angular/router';
import { GameService } from 'services';

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
     */
    public constructor(private gameService: GameService) {}
}
