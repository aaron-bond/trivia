import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { ShellComponent } from './shell/shell.component';
import { OpenTriviaAPI } from '../api/open-trivia.api';
import { SocketService } from './socket.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [ShellComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        BrowserAnimationsModule,
        MaterialModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [OpenTriviaAPI, SocketService],
    bootstrap: [ShellComponent]
})
export class AppModule {}
