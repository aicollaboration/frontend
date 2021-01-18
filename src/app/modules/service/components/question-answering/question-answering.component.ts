import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionAnsweringService } from '../../services/question-answering.service';
import { Country } from '@angular-material-extensions/select-country';

@Component({
    selector: 'question-answering',
    templateUrl: './question-answering.component.html',
    styleUrls: [
        './question-answering.component.scss',
    ],
})
export class QuestionAnsweringComponent implements OnInit {
    public form = new FormGroup({
        context: new FormControl(),
        question: new FormControl(),
    });
    public answer = '';

    public request = {};
    public response = [];
    public loading = false;
    public country: Country = {
        name: 'Deutschland',
        alpha2Code: 'DE',
        alpha3Code: 'DEU',
        numericCode: '276'
    };

    constructor(private questionAnsweringService: QuestionAnsweringService) { }

    public ngOnInit(): void {
        const context = 'The Matrix is a 1999 science fiction action film written and directed by The Wachowskis, starring Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano. It depicts a dystopian future in which reality as perceived by most humans is actually a simulated reality called "the Matrix", created by sentient machines to subdue the human population, while their bodies heat and electrical activity are used as an energy source. Computer programmer "Neo" learns this truth and is drawn into a rebellion against the machines, which involves other people who have been freed from the dream world.';
        const question = 'Who stars in The Matrix?';

        this.form.patchValue({
            context,
            question
        });
    }

    public ask(): void {
        this.loading = true;

        const values = this.form.value;
        const observable = this.questionAnsweringService.ask(values.question, values.context);
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
                    this.answer = uploadEvent.body.answer;
                    this.loading = false;
                    break;
            }
        });
    }

    public onCountrySelected(country: Country): void {
        console.log(country);
    }
}
