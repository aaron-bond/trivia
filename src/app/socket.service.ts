import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable()
export class SocketService {
    public messageReceived: Subject<string> = new Subject<string>();

    public constructor(private socket: Socket) {
        this.socket.on('message', (msg: string) => {
            this.messageReceived.next(msg);
        });
    }

    public sendMessage(msg: string) {
        this.socket.emit('message', msg);
    }
}
