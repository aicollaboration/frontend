import { Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { load } from 'js-yaml';
import { ServiceModel } from "../../models/service.model";
import { ServiceService } from '../../services/service.service';

@Component({
    selector: 'service-creation',
    templateUrl: './service-creation.component.html',
    styleUrls: [
        './service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class ServiceCreationComponent {
    public service: ServiceModel;
    public serviceModel = new ServiceModel();
    public files: File[] = [];
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
        repoName: new FormControl(''),
        description: new FormControl(''),
        api: new FormControl(''),
        file: new FormControl(''),
    });

    public constructor(
        private router: Router,
        private serviceService: ServiceService,
        private snackBar: MatSnackBar,
    ) { }

    public async onSubmit(): Promise<void>  {
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

        this.apiCall();

        this.serviceService.createService(this.serviceForm.value).then(data => {
            console.log(data)
            this.snackBar.open(`You created a service successfully!`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
            this.router.navigate(['/services']);
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });
    }

    public async apiCall(): Promise<void>  {
        const dtValue = this.serviceForm.value['repoName']; 
        const URL =  'https://www.aipioneers.tech:8443/jenkins/job/Creating-New-API/buildWithParameters?token=11dccdd0813f43e23ae6fd112908c7d37c&New_Job_Name=' + dtValue;
        
        try { 
            fetch(URL, {
                method: 'GET', 
                mode: 'no-cors',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa('admin:aiadmin'),
                }, } )
            .then(response => { console.log(response); } )
            .catch(error => { console.log(error); } );
                
        } catch (e) {
            console.log('error');
            } finally {
            //    alert("success");
        }
    }

    public async apiCall2(): Promise<void>  {
        const dtValue = this.serviceForm.value['repoName']; 
        
        try { 
        
            const url = 'https://api.github.com/repos/aicollaboration/kiavip/generate';
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
        
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer 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');
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            xhr.onreadystatechange = () => {
                                    if (xhr.readyState === 4) {
                                    console.log(xhr.status);
                                    console.log(xhr.responseText);
                                }};
        
            const data = `{
            "owner":"aicollaboration", 
            "name": "${dtValue}"
            }`;
        
            xhr.send(data);
        
                
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
