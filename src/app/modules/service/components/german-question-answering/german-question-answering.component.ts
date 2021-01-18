import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'german-question-answering',
    templateUrl: './german-question-answering.component.html',
    styleUrls: [
        './german-question-answering.component.scss'
    ]
})
export class GermanQuestionAnsweringComponent  {
    public form = new FormGroup({
        context: new FormControl(),
        question: new FormControl(),
    });
    public loading = false;
    public answer = '';
    
    public request = {};
    public response = [];

    public constructor(private httpClient: HttpClient) {
    }

    public ask(): void {
        this.loading = true;

        const values = this.form.value;
        const url = `https://demos.deepset.ai/models/2/inference`;
        const body = {
            input: [{
                questions: [ values.question ],
                text: values.context
            }],
            language: 'english',
            model: {
                id: 2,
                language: 'english',
                name: 'bert-english-qa-large',
                prediction_type: 'span_classification'
            },
        };
        const observable = this.httpClient.post(url, body, { observe: 'events' });
        observable.subscribe(uploadEvent => {
            this.response.push(uploadEvent);

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
                    this.answer = uploadEvent.body['predictions'][0]['answers'][0]['answer'];
                    this.loading = false;
                    break;
            }
        });
    }
}
