import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServiceModel } from "../../models/service.model";
import { ServiceService } from '../../services/service.service';
import yaml from 'js-yaml';

@Component({
    selector: 'service-creation',
    templateUrl: './service-creation.component.html',
    styleUrls: [
        './service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class ServiceCreationComponent {
    service: ServiceModel[];
    serviceModel = new ServiceModel();
    public files: File[] = [];
    messageTrue: boolean = false; 

    public serviceForm = new FormGroup({
        name : new FormControl(''),
        description : new FormControl(''),
        api: new FormControl(''),
        file: new FormControl(''),
    });

    public constructor(private serviceService:ServiceService) { }
    
    public async onSubmit() {
       const service: ServiceModel = {
            ...this.serviceForm.value,
        };

        if (this.files.length > 0) {
            const file = await this.serviceService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
            service.file = file.Key;
        }

        const apiInput = this.serviceForm.value['api'];
        const obj = yaml.load(apiInput);
        const api = JSON.stringify(obj, null, 2);
        this.serviceForm.value.api = api;
  
        this.serviceService.createService(this.serviceForm.value)
          .then(data => {
            console.log(data)
            this.messageTrue=true;
        });   
      }

     public onSelect(event): void {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    public onRemove(event): void {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }
    
}
