import { Component, OnInit } from '@angular/core';
import { FaqCategoryModel } from '../models/faq-category';
import { DocumentationService } from '../services/documentation.service';

@Component({
    selector: 'documentation-overview',
    templateUrl: './documentation-overview.component.html',
    styleUrls: [
        './documentation-overview.component.scss',
    ]
})
export class DocumentationOverviewComponent implements OnInit {
    public faqCategory: FaqCategoryModel;

    public constructor(private documentationService: DocumentationService) {

    }
    ngOnInit(): void {
        /*
        this.documentationService.getFaqs().subscribe((faqCategories) => {
        });
        */
    }
}
