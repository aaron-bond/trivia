import { Component } from '@angular/core';

import { OpenTriviaAPI } from 'src/api/open-trivia.api';
import { Category } from 'src/model';

@Component({
    selector: 'shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
    public Questions: OpenTrivia.Question[];
    public SelectedCategory: Category = Category.GeneralKnowledge;

    public Category = Category;

    public get CategoryOptions() {
        let categories = Object.keys(Category);

        return categories.slice(0, categories.length / 2);
    }

    public constructor(private triviaAPI: OpenTriviaAPI) {}

    public getQuestions(): void {
        this.triviaAPI.getQuestions(this.SelectedCategory).subscribe({
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

    private handleSuccess(response: OpenTrivia.Response): void {
        this.Questions = response.results;
    }
}
