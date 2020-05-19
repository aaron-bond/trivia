import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShellComponent } from './shell.component';
import { OpenTriviaAPI, SocketService, GameService } from 'services';
import { Category } from 'model';

class OpenTriviaAPISpy {
    public getQuestions: jasmine.Spy = jasmine.createSpy('getQuestions').and.callFake((category: Category) => {});
}

class SocketServiceSpy {
    public sendMessage: jasmine.Spy = jasmine.createSpy('sendMessage').and.callFake((msg: string) => {});

    public messageReceived: jasmine.Spy = jasmine.createSpyObj('messageReceived', ['subscribe']);
}

class GameServiceSpy {
    public LobbySynchronised: jasmine.Spy = jasmine.createSpyObj('LobbySynchronised', ['subscribe']);
}

describe('ShellComponent', () => {
    let component: ShellComponent;
    let fixture: ComponentFixture<ShellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShellComponent],
            providers: [
                { provide: OpenTriviaAPI, useClass: OpenTriviaAPISpy },
                { provide: SocketService, useClass: SocketServiceSpy },

                { provide: GameService, useClass: GameServiceSpy }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
