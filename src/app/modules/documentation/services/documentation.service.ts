import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaqCategoryModel } from '../models/faq-category';
@Injectable({
    providedIn: 'root'
})
export class DocumentationService {
    public constructor(private httpClient: HttpClient) {
    }

    public getFaqs(): Observable<FaqCategoryModel[]> {
        return this.httpClient.get<FaqCategoryModel[]>('api/pages/help-center/faq');
    }
}
