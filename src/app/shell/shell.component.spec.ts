import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShellComponent } from './shell.component';
import { OpenTriviaAPI } from 'src/api/open-trivia.api';
import { Category } from 'src/model';

class StorageHelperSpy {
    public getQuestions: jasmine.Spy = jasmine
        .createSpy('getQuestions')
        .and.callFake((category: Category) => {});
}

describe('ShellComponent', () => {
    let component: ShellComponent;
    let fixture: ComponentFixture<ShellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShellComponent],
            providers: [{ provide: OpenTriviaAPI, useClass: StorageHelperSpy }],
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
