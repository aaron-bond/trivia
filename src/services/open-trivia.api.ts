import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from 'model';

@Injectable()
export class OpenTriviaAPI {
    private url = 'https://opentdb.com/api.php';

    private config: OpenTrivia.RequestParams = {
        amount: 10,
        category: Category.GeneralKnowledge
    };

    public constructor(private http: HttpClient) {}

    public healthCheck(): Observable<void> {
        return this.request();
    }

    public getQuestions(category: Category): Observable<OpenTrivia.Response> {
        this.config.category = category;

        return this.request();
    }

    private request<T>(): Observable<T> {
        return this.http.get(this.url, {
            params: this.config as any
        }) as Observable<T>;
    }
}
