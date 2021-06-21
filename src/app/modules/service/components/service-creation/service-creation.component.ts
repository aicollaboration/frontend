import { Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import yaml from 'js-yaml';
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
    public files: File[] = [];

    public serviceForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        api: new FormControl(''),
        file: new FormControl(''),
    });

    public constructor(
        private router: Router,
        private serviceService: ServiceService,
        private snackBar: MatSnackBar,
    ) { }

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

        this.serviceService.createService(this.serviceForm.value).then(data => {
            console.log(data)
            this.snackBar.open(`You created a service successfully!`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
            this.router.navigate(['/services']);
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
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
