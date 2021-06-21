import { ServiceModel } from './../../models/service.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadServiceAction } from '../../state/service.actions';
import { getServiceSelector, State } from '../../state/service.reducer';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'service',
    templateUrl: './service-detail.component.html',
    styleUrls: [
        './service-detail.component.scss',
    ],
})
export class ServiceDetailComponent implements OnInit {
    public service$: Observable<ServiceModel>;
    public api: any;
    public loading = false;
    public response = '';
    public form = new FormGroup({
        question: new FormControl(),
        context: new FormControl(),
    });

    public constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.service$ = this.store.select(getServiceSelector);
        this.service$.subscribe(service => {
            if (service) {
                const api = this.api = JSON.parse(service.api);
                for (let [key, value] of Object.entries(api.paths)) {
                    console.log(`kv`, key, value);
                }
            }
        });

        this.route.params.subscribe(params => {
            this.store.dispatch(loadServiceAction({ serviceId: params.id }));
        });
    }

    public predict() {
        this.loading = true;

        const values = this.form.value;
        this.http.post(`http://localhost:5000/api/1.0/predict`, values)
            .subscribe((response) => {
                this.response = JSON.stringify(response);
                this.loading = false;
            }, (error) => {
                this.loading = false;
            });
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
        const observable = this.http.post(url, body, { observe: 'events' });
        observable.subscribe(uploadEvent => {
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
                    this.response = uploadEvent.body['predictions'][0]['answers'][0]['answer'];
                    this.loading = false;
                    break;
            }
        });
    }
}
