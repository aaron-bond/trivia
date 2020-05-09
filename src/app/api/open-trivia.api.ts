import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OpenTriviaAPI {
    private url = 'https://opentdb.com/api.php';
    private config = {
        amount: '10'
    };

    public constructor(private http: HttpClient) {}

    public healthCheck(): Observable<void> {
        return this.request(``);
    }

    public getQuestions(): Observable<OpenTrivia.Response> {
        return this.request(`?amount=10`);
    }

    private request<T>(endpoint: string): Observable<T> {
        return this.http.get(this.url + endpoint, {
            params: this.config
        }) as Observable<T>;
    }
}
