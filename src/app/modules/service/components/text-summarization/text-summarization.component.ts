import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextSummarizationService } from '../../services/text-summarization.service';

@Component({
    selector: 'text-summarization',
    templateUrl: './text-summarization.component.html',
    styleUrls: [
        './text-summarization.component.scss',
    ]
})
export class TextSummarizationComponent {
    public form = new FormGroup({
        context: new FormControl(),
        //        config: new FormGroup({
        maxLength: new FormControl(),
        //        })
    });
    public loading = false;
    public answer = '';

    constructor(private textSummarizationService: TextSummarizationService) {

    }

    public summarize(): void {
        this.loading = true;

        const values = this.form.value;
        const observable = this.textSummarizationService.summarize(values.context);
        observable.subscribe(uploadEvent => {
            // this.response.push(uploadEvent);

            switch (uploadEvent.type) {
                case HttpEventType.Sent:
                    console.log('uploadEvent#sent ', uploadEvent);
                    break;
                case HttpEventType.UploadProgress:
                    console.log('uploadEvent#uploadProgress: ', uploadEvent.loaded, uploadEvent.total);
                    break;
                case HttpEventType.User:
                    console.log('uploadEvent#user ', uploadEvent);
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('uploadEvent#responseHeader ', uploadEvent);
                    break;
                case HttpEventType.DownloadProgress:
                    console.log('uploadEvent#download ', uploadEvent);
                    break;
                case HttpEventType.Response:
                    console.log('uploadEvent#response ', uploadEvent);
                    this.answer = uploadEvent.body.summary;
                    this.loading = false;
                    break;
            }
        });
    }
}
