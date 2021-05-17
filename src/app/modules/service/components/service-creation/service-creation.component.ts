import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
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

    service: ServiceModel[];
    serviceModel = new ServiceModel();
    
    constructor(private serviceService:ServiceService) {}
    
    serviceForm = new FormGroup({
    name : new FormControl(''),
    description : new FormControl(''),
    img : new FormControl(''),
    });

    onSubmit() {
        console.warn(this.serviceForm.value);
        
      }

      addService() {
        this.serviceService.createService(this.serviceForm.value)
          .then(data => {
            console.log(data)
        })    
      }
}