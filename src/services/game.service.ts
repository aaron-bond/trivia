import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable()
export class GameService {
    public PlayerAdded: Subject<PlayerInfo[]> = new Subject<PlayerInfo[]>();

    /**
     * Whether the full-screen splash is displayed
     * By default, the shell overlay is displayed and then dismissed with some action
     */
    public ShowSplashScreen = true;

    /**
     *
     */
    public Players: PlayerInfo[] = [];

    public constructor(private socketService: SocketService) {
        this.socketService.InformationShared.subscribe({
            next: (info) => this.handleInformationShared(info)
        });

        this.socketService.LobbySynchronised.subscribe({
            next: (lobby) => this.handleLobbySynchronised(lobby)
        });
    }

    /**
     *
     * @param playerInfo
     */
    public AddPlayer(playerInfo: PlayerInfo): void {
        this.Players.push(playerInfo);
    }

    /**
     *
     * @param info
     */
    private handleInformationShared(info: string): void {
        let playerInfo: PlayerInfo = JSON.parse(info);
        this.Players = [...this.Players, playerInfo];

        this.PlayerAdded.next(this.Players);

        this.socketService.SynchroniseLobby(JSON.stringify(this.Players));
    }

    /**
     *
     * @param lobby
     */
    private handleLobbySynchronised(lobby: string): void {
        let players: PlayerInfo[] = JSON.parse(lobby);
        this.Players = players;
    }
}
