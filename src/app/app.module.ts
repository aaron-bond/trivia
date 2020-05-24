// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

// 3rd-party imports
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Module imports
import { MaterialModule } from './material.module';

// Utility impports
import { environment } from 'environments/environment';

// Services
import { OpenTriviaAPI, SocketService, GameService } from 'services';

// Components
import { ShellComponent } from 'app/shell/shell.component';
import { CreateGameComponent } from 'app/create-game/create-game.component';
import { JoinGameComponent } from 'app/join-game/join-game.component';
import { LobbyComponent } from 'app/lobby/lobby.component';

const config: SocketIoConfig = {
    url: environment.socketPath,
    options: {}
};

const routes: Routes = [
    { path: 'lobby', component: LobbyComponent },
    { path: 'create', component: CreateGameComponent },
    { path: 'join', component: JoinGameComponent },
    { path: 'join/:lobbyId', component: JoinGameComponent },
    { path: '*', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        ShellComponent,

        // Components
        CreateGameComponent,
        JoinGameComponent,
        LobbyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,

        BrowserAnimationsModule,
        MaterialModule,
        SocketIoModule.forRoot(config),
        RouterModule.forRoot(routes)
    ],
    providers: [OpenTriviaAPI, SocketService, GameService],
    bootstrap: [ShellComponent]
})
export class AppModule {}
