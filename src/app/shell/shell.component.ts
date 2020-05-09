import { Component, OnInit } from '@angular/core';
import { OpenTriviaAPI } from '../api/open-trivia.api';

@Component({
    selector: 'shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
    public questions: OpenTrivia.Question[];

    public constructor(private triviaAPI: OpenTriviaAPI) {}

    ngOnInit(): void {}

    public getQuestions(): void {
        this.triviaAPI.getQuestions().subscribe({
            next: (result) => this.handleSuccess(result)
        });
    }

    private handleSuccess(response: OpenTrivia.Response): void {
        this.questions = response.results;
    }
}
