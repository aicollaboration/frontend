import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ServiceModel } from "../../models/service.model";
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadServiceAction } from '../../state/service.actions';
import { getServiceSelector, State } from '../../state/service.reducer';


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

    public serviceForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
       // img: new FormControl(''),
    });

    constructor(
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private store: Store<State>,
     ) {}


    ngOnInit(): void {
        this.service$ = this.store.select(getServiceSelector);

    this.service$.subscribe(serviceModel => {
        //debugger;
        if (serviceModel) {
            this.serviceForm.patchValue(serviceModel)
        }
    })

        this.route.params.subscribe(params => {
            this.serviceId = params.id;
            this.store.dispatch(loadServiceAction({ serviceId: params.id }));
        });
    }

    onSubmit() {
        console.warn(this.serviceForm.value);
    }

    updateService() {
        debugger;
        this.serviceService.updateService(this.serviceForm.value, this.serviceId).then(data => {
            console.log(data)
        });
    }
}
