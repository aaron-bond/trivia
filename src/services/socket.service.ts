import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

// TODO separate socket service into socket-stuff and game-stuff in a new service

enum Server {
    CreateRoom = 'create-room',
    JoinRoom = 'join-room',
    ShareInformation = 'share-information',
    SynchroniseLobby = 'synchronise-lobby'
}

enum Client {
    RoomCreated = 'room-created',
    RoomJoined = 'room-joined',
    InformationShared = 'information-shared',
    LobbySynchronised = 'lobby-synchronised'
}

@Injectable()
export class SocketService {
    public RoomCreated = new Subject<string>();
    public RoomJoined = new Subject<void>();
    public InformationShared = new Subject<string>();
    public LobbySynchronised = new Subject<string>();

    public RoomId: string = null;

    public constructor(private socket: Socket) {
        this.socket.on(Client.RoomCreated, (roomId: string) => this.handleRoomCreated(roomId));
        this.socket.on(Client.RoomJoined, () => this.handleRoomJoined());
        this.socket.on(Client.LobbySynchronised, (lobby: string) => this.handleLobbySync(lobby));
    }

    public CreateRoom(): void {
        this.socket.emit(Server.CreateRoom);
    }

    public JoinRoom(roomId: string): void {
        this.socket.emit(Server.JoinRoom, roomId);
    }

    public ShareInformation(information: string): void {
        this.socket.emit(Server.ShareInformation, information);
    }

    public SynchroniseLobby(lobby: string): void {
        this.socket.emit(Server.SynchroniseLobby, lobby);
    }

    private handleRoomCreated(roomId: string): void {
        this.RoomId = roomId;

        // only the host should listen for the information shared event
        this.socket.on(Client.InformationShared, (information: string) => this.handleInformationShared(information));

        this.RoomCreated.next(this.RoomId);
    }

    private handleRoomJoined(): void {
        this.RoomJoined.next();
    }

    private handleInformationShared(information: string): void {
        this.InformationShared.next(information);
    }

    private handleLobbySync(lobby: string): void {
        this.LobbySynchronised.next(lobby);
    }
}
