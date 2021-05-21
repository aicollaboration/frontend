import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ServiceModel } from "../../models/service.model";
import { ServiceService } from '../../services/service.service';
import { loadServiceAction } from '../../state/service.actions';
import { getServiceSelector, State } from '../../state/service.reducer';
import yaml from 'js-yaml';

@Component({
    selector: 'service-editor',
    templateUrl: './service-editor.component.html',
    styleUrls: [
        './service-editor.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class ServiceEditorComponent implements OnInit {
    public service$: Observable<ServiceModel>;
    public service: ServiceModel;
    public serviceModel = new ServiceModel();
    private serviceId: string;
    public files: File[] = [];
    public path: string;
    public bucket: string;

    public serviceForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        file: new FormControl(''),
    });

    constructor(
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private store: Store<State>,
    ) { }

    public ngOnInit(): void {
        this.service$ = this.store.select(getServiceSelector);

        this.service$.subscribe(serviceModel => {
            if (serviceModel) {
                this.loadService(serviceModel)
            }
        })
        this.route.params.subscribe(params => {
            this.serviceId = params.id;
            this.store.dispatch(loadServiceAction({ serviceId: params.id }));
        });
    }

    public async loadService(serviceModel: ServiceModel) {
        this.serviceForm.patchValue(serviceModel);

        if (serviceModel.file) {
            const foo = await this.serviceService.getFile(serviceModel.file);
        }
        
    }

    public async onSubmit() {
        const service: ServiceModel = {
            ...this.serviceForm.value,
        };

        if (this.files.length > 0) {
            const file = await this.serviceService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
            service.file = file.Key;
        }

        // verarbeitung von api.yml
        /*
        const apiInput = this.serviceForm.value['api'];
        const obj = yaml.load(apiInput);
        const api = JSON.stringify(obj, null, 2);
        service.api = api;
        */

        this.serviceService.updateService(service, this.serviceId).then(data => {
            // @todo success
            this.store.dispatch(loadServiceAction({ serviceId: this.serviceId }));
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