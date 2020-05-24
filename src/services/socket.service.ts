import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

enum Server {
    CreateLobby = 'create-lobby',
    JoinLobby = 'join-lobby',
    ShareInformation = 'share-information',
    SynchroniseLobby = 'synchronise-lobby'
}

enum Client {
    LobbyCreated = 'lobby-created',
    LobbyClosed = 'lobby-closed',
    LobbyJoined = 'lobby-joined',
    InformationShared = 'information-shared',
    LobbySynchronised = 'lobby-synchronised'
}

@Injectable()
export class SocketService {
    public LobbyCreated = new Subject<string>();
    public LobbyJoined = new Subject<void>();
    public InformationShared = new Subject<string>();
    public LobbySynchronised = new Subject<string>();
    public LobbyClosed = new Subject<void>();

    public LobbyId: string = null;

    /**
     * Creates a new instance of the SocketService
     * @param socket The socket opened to the server ready to receive events
     */
    public constructor(private socket: Socket) {
        this.socket.on(Client.LobbyCreated, (lobbyId: string) => this.handleLobbyCreated(lobbyId));
        this.socket.on(Client.LobbyJoined, () => this.handleLobbyJoined());
        this.socket.on(Client.LobbySynchronised, (lobby: string) => this.handleLobbySync(lobby));
        this.socket.on(Client.LobbyClosed, () => this.handleLobbyClosed());
    }

    /**
     * Create and become the host of a lobby which other clients can join
     */
    public CreateLobby(): void {
        this.socket.emit(Server.CreateLobby);
    }

    /**
     * Join an existing lobby
     * @param lobbyId The lobby to join
     */
    public JoinLobby(lobbyId: string): void {
        // TODO something should happen when this fails
        this.socket.emit(Server.JoinLobby, lobbyId);
    }

    /**
     * Share client information with the host so that it can be redistributed to the whole lobby
     */
    public ShareInformation(information: string): void {
        this.socket.emit(Server.ShareInformation, information);
    }

    /**
     * Synchronise the lobby to all participants
     * @param lobby The information for all participants in the lobby
     */
    public SynchroniseLobby(lobby: string): void {
        this.socket.emit(Server.SynchroniseLobby, lobby);
    }

    //#region Server event handlers

    private handleLobbyCreated(lobbyId: string): void {
        this.LobbyId = lobbyId;

        // only the host should listen for the information shared event
        this.socket.on(Client.InformationShared, (information: string) => this.handleInformationShared(information));

        this.LobbyCreated.next(this.LobbyId);
    }

    private handleLobbyJoined(): void {
        this.LobbyJoined.next();
    }

    private handleInformationShared(information: string): void {
        this.InformationShared.next(information);
    }

    private handleLobbySync(lobby: string): void {
        this.LobbySynchronised.next(lobby);
    }

    private handleLobbyClosed(): void {
        this.LobbyClosed.next();
    }

    //#endregion
}
