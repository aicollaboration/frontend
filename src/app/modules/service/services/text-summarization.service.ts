import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TextSummarizationService {
    constructor(private httpClient: HttpClient) {
    }

    public summarize(context: string): Observable<any> {
        const url = `https://text-summarization.service.aiplatform.space/api/1.0/predict`;
        const body = { context };

        return this.httpClient.post(url, body, { observe: 'events' });
    }
}
