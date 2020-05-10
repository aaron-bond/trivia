import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShellComponent } from './shell/shell.component';
import { OpenTriviaAPI } from '../api/open-trivia.api';

@NgModule({
    declarations: [ShellComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [OpenTriviaAPI],
    bootstrap: [ShellComponent]
})
export class AppModule {}
