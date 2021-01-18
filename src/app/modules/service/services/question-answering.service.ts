import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionAnsweringService {
    constructor(private httpClient: HttpClient) {
    }

    public ask(question: string, context: string): Observable<any> {
        const url = `http://45c5dc40-default-fargateek-91b6-1077349412.eu-central-1.elb.amazonaws.com/api/1.0/predict`;
        const body = { context, question };

        return this.httpClient.post(url, body, { observe: 'events' });
    }
}
