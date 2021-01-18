import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'document-classification',
    templateUrl: './document-classification.component.html',
    styleUrls: [
        './document-classification.component.scss',
    ]
})
export class DocumentClassificationComponent {
    public form = new FormGroup({
        text: new FormControl(),
    });
    public loading = false;
    public answer = '';

    public classify(): void {
        
    }
}
