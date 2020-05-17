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
import { OpenTriviaAPI, SocketService } from 'services';

// Components
import { ShellComponent } from 'app/shell/shell.component';
import { CreateGameComponent } from 'app/shell/create-game/create-game.component';
import { JoinGameComponent } from 'app/shell/join-game/join-game.component';
import { LobbyComponent } from 'app/lobby/lobby.component';

const config: SocketIoConfig = {
    url: environment.socketPath,
    options: {}
};

const routes: Routes = [{ path: 'lobby', component: LobbyComponent }];

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
    providers: [OpenTriviaAPI, SocketService],
    bootstrap: [ShellComponent]
})
export class AppModule {}
