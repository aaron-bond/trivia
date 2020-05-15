import { Component } from '@angular/core';

import { OpenTriviaAPI } from 'src/api/open-trivia.api';
import { Category } from 'src/model';
import { SocketService } from '../socket.service';

@Component({
    selector: 'shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
    public Questions: OpenTrivia.Question[];

    public CurrentQuestion: OpenTrivia.Question;

    public AnswerResult: string;

    public Category = Category;

    public get CategoryOptions() {
        let categories = Object.keys(Category);

        return categories.slice(0, categories.length / 2);
    }

    public constructor(
        private triviaAPI: OpenTriviaAPI,
        private socketService: SocketService
    ) {
        this.socketService.sendMessage('from angular!');
    }

    public getQuestions(category: Category): void {
        this.triviaAPI.getQuestions(category).subscribe({
            next: (result) => this.handleSuccess(result)
        });
    }

    public RandomiseAnswers(question: OpenTrivia.Question): string[] {
        let allAnswers: string[] = [
            question.correct_answer,
            ...question.incorrect_answers
        ];

        if (allAnswers.indexOf('True') > -1) {
            return allAnswers.sort((a, b) => b.localeCompare(a));
        } else {
            return allAnswers.sort((a, b) => a.localeCompare(b));
        }
    }

    public NextQuestion(): void {
        this.CurrentQuestion = this.Questions.pop();
        this.AnswerResult = null;
    }

    public ChooseAnswer(answer: string): void {
        if (answer === this.CurrentQuestion.correct_answer) {
            this.AnswerResult = 'Correct!';
        } else {
            this.AnswerResult = 'Incorrect';
        }

        setTimeout(() => {
            this.NextQuestion();
        }, 2000);
    }

    private handleSuccess(response: OpenTrivia.Response): void {
        this.Questions = response.results;
        this.NextQuestion();
    }
}
