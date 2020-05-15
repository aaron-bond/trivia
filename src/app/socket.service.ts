import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable()
export class SocketService {
    public messageReceived: Subject<string> = new Subject<string>();

    public constructor(private socket: Socket) {}

    public sendMessage(msg: string) {
        console.log('msg = ' + msg);

        this.socket.emit('message', msg);

        this.socket.on('message', (msg: string) => {
            console.log('rec = ' + msg);
            this.messageReceived.next(msg);
        });
    }
}
