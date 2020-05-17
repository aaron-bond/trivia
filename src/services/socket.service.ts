import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

// TODO separate socket service into socket-stuff and game-stuff in a new service

enum Server {
    CreateRoom = 'create-room',
    JoinRoom = 'join-room',
    ShareInformation = 'share-information'
}

enum Client {
    RoomCreated = 'room-created',
    RoomJoined = 'room-joined',
    InformationShared = 'information-shared'
}

@Injectable()
export class SocketService {
    public RoomCreated: Subject<string> = new Subject<string>();
    public RoomJoined: Subject<void> = new Subject<void>();

    private roomId: string = null;
    private isHost: boolean = false;

    public constructor(private socket: Socket) {
        this.socket.on(Client.RoomCreated, (roomId: string) => this.handleRoomCreated(roomId));
        this.socket.on(Client.RoomJoined, () => this.handleRoomJoined());

        /* this.socket.on('player-joined', (playerInfo: PlayerInfo) => {
            if (this.isHost) {
                this.PlayerJoined.next(playerInfo);

                this.Players.push(playerInfo);
            }
        }); */
    }

    public CreateRoom(): void {
        this.socket.emit(Server.CreateRoom);
    }

    public JoinRoom(roomId: string): void {
        this.socket.emit(Server.JoinRoom, roomId);
    }

    private handleRoomCreated(roomId: string): void {
        this.roomId = roomId;
        this.isHost = true;

        // only the host should listen for the information shared event
        this.socket.on(Client.InformationShared, (information) => console.log(information));

        this.RoomCreated.next(this.roomId);
    }

    private handleRoomJoined(): void {
        this.RoomJoined.next();

        this.socket.emit(Server.ShareInformation, 'New player from Angular');
    }
}
