import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { load } from 'js-yaml';
import { Observable } from 'rxjs';
import { ServiceModel } from "../../models/service.model";
import { ServiceService } from '../../services/service.service';
import { loadServicesAction } from '../../state/service.actions';
import { getErrorSelector, getServicesSelector, State } from '../../state/service.reducer';


@Component({
    selector: 'service-creation',
    templateUrl: './service-creation.component.html',
    styleUrls: [
        './service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class ServiceCreationComponent implements OnInit {

    public services$: Observable<ServiceModel[]>;

    public service: ServiceModel;
    public serviceModel = new ServiceModel();
    public files: File[] = [];
    public error$: Observable<string>;
    public serviceNames = [];
    public allreadyPresent = "";
    public apiPlaceholder = JSON.stringify({
        "openapi": "3.0.0",
        "info": {
            "title": "Micro model service for questions answering",
            "version": "1.0.0",
            "description": "It will use a pretrained bert"
        },
        "servers": [
            {
                "url": "https://question-answering.aiproduct.io"
            },
            {
                "url": "http://localhost:5000"
            }
        ],
        "paths": {
            "/api/1.0/predict": {
                "post": {
                    "operationId": "inference",
                    "requestBody": {
                        "description": "",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "context": {
                                            "type": "string",
                                            "description": "The text you want to search in"
                                        },
                                        "question": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "task": {
                                                "type": "string"
                                            },
                                            "predictions": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "question": {
                                                            "type": "string"
                                                        },
                                                        "question_id": {
                                                            "type": "string"
                                                        },
                                                        "ground_truth": {
                                                            "type": "string"
                                                        },
                                                        "answers": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "prediction_rank": {
                                                                        "type": "number"
                                                                    },
                                                                    "score": {
                                                                        "type": "number"
                                                                    },
                                                                    "probability": {
                                                                        "type": "number"
                                                                    },
                                                                    "answer": {
                                                                        "type": "string"
                                                                    },
                                                                    "offset_start": {
                                                                        "type": "number"
                                                                    },
                                                                    "offset_end": {
                                                                        "type": "number"
                                                                    },
                                                                    "context": {
                                                                        "type": "string"
                                                                    },
                                                                    "offset_context_start": {
                                                                        "type": "number"
                                                                    },
                                                                    "offset_context_end": {
                                                                        "type": "number"
                                                                    },
                                                                    "document_id": {
                                                                        "type": "number"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, null, 4);

    public suggestedServices: ServiceModel[] = [
        {
            id: '1',
            name: 'Text summarization',
            description: 'Text Summarization API provides professional text summarizer service which is based on advanced Natural Language Processing and Machine Learning technologies. It can be used to summarize short important text from the URL or document that user provided.',
            author: '',
        },
        {
            id: '2',
            name: 'Question Answering',
            description: 'This service gives answers to queries in natural language.',
            author: '',
        },
    ];

    public serviceForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        api: new FormControl(''),
        file: new FormControl(''),
        checked: new FormControl(false),
    });

    public constructor(
        private router: Router,
        private serviceService: ServiceService,
        private snackBar: MatSnackBar,
        private store: Store<State>
    ) { }

    public ngOnInit(): void {
        this.services$ = this.store.select(getServicesSelector);
        this.error$ = this.store.select(getErrorSelector);

        this.store.dispatch(loadServicesAction());
        console.log(this.services$);

        this.services$.subscribe((res) => {
            this.serviceNames = res.map(item => item.name);
            console.log(this.serviceNames);
        }, (err) => {
            console.log('error', err);
        });
    }

    public onTypeChange(newName: string) {
        const error = this.serviceNames.includes(newName);
        if (error) {
            this.allreadyPresent = "Name already present";
        } else {
            this.allreadyPresent = "";
        }
        console.log(error);
    }

    public async onSubmit(): Promise<void> {
        const service: ServiceModel = {
            ...this.serviceForm.value,
        };

        if (this.files.length > 0) {
            const file = await this.serviceService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
            service.file = file.Key;
        }

        const apiInput = this.serviceForm.value['api'];
        const obj = load(apiInput);
        const api = JSON.stringify(obj, null, 2);
        this.serviceForm.value.api = api;

        const onlyService = this.serviceForm.value['checked'];

        console.log(this.serviceForm.value);

        const serviceTest: ServiceModel = {
            ...this.serviceForm.value
        };
        delete serviceTest['checked'];

        console.log(serviceTest);

        this.serviceService.createService(serviceTest).then(data => {
            console.log(data);
            this.snackBar.open(`You created a service successfully!`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
            this.router.navigate(['/services']);
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });

        if (!onlyService) {
            this.createService();
        }
    }

    public async onSubmitCreateService(): Promise<void> {

        const service: ServiceModel = {
            ...this.serviceForm.value,
        };

        if (this.files.length > 0) {
            const file = await this.serviceService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
            service.file = file.Key;
        }

        const apiInput = this.serviceForm.value['api'];
        const obj = load(apiInput);
        const api = JSON.stringify(obj, null, 2);
        this.serviceForm.value.api = api;

        this.serviceService.createService(this.serviceForm.value).then(data => {
            console.log(data);
            this.snackBar.open(`You created a service successfully!`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
            this.router.navigate(['/services']);
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });

    }


    public async createService(): Promise<void> {
        const serviceName = this.serviceForm.value['name'];

        // const octokit = new Octokit({ auth: `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` });
        
        // Copy template



        // Replace variables

        
        // Add actions

        /*
        const appId = '3600086491066898c408';
        const privateKey = 'e6dca206aa5effd252d877d856485f4bc83c993d';
        const octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                appId,
                privateKey,
            },
        });
        await octokit.rest.repos.createOrUpdateFileContents({
            owner: '',
            repo: '',
            path: '',
            message: '',
            content: '',
            committer: {
                name: '',
                email: '',
            },
            author: {
                name: '',
                email: ''
            }
        })
       await octokit.rest.repos.createDeployment({
           owner: '',
           repo: '',
           ref: '',
       })
        await octokit.rest.repos.createUsingTemplate({
            template_owner: 'aicollaboration',
            template_repo: 'service-template-python',
            org: "aicollaborationservices",
            name: 'service'
        });


        */




        try {
            const url = 'https://api.github.com/repos/aicollaboration/service-template-python/generate';

            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);

            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer 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');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                }
            };

            const data = `{
                "owner":"aicollaborationservices", 
                "name": "${serviceName}"
            }`;

            xhr.send(data);

        } catch (e) {
            console.log('error');
        } finally {
            //    alert("success");
            this.apiCallCreateJob();
        }
    }

    public async apiCallCreateJob(): Promise<void> {
        const dtValue = this.serviceForm.value['name'];
        const URL = 'https://www.aipioneers.tech:8443/jenkins/job/Creating-New-API/buildWithParameters?token=11dccdd0813f43e23ae6fd112908c7d37c&New_Job_Name=' + dtValue;

        try {
            fetch(URL, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + window.btoa('admin:aiadmin'),
                },
            })
                .then(response => { console.log(response); })
                .catch(error => { console.log(error); });

        } catch (e) {
            console.log('error');
        } finally {
            //    alert("success");
        }
    }

    public onSelect(event): void {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    public onRemove(event): void {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }

    // tslint:disable-next-line:typedef
    public changeApi(a: any) {
        const api = this.serviceForm.value.api;
        if (api.length > 0) {
            const language = this.detectLanguage(api);
            console.log(`language ${language}`);
        }
    }

    // tslint:disable-next-line:typedef
    private detectLanguage(code: string) {
        try {
            JSON.parse(code);
            return 'JSON';
        } catch (e) {
        }
        try {
            load(code);
            return 'YAML';
        } catch (e) {
        }
        return 'UNKNOWN';
    }

}
