import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {
    public constructor(private socket: Socket) {
        console.log('hello');
    }

    public sendMessage(msg: string) {
        this.socket.emit('message', msg);
    }
}
