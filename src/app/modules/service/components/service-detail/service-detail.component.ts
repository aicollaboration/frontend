import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadServiceAction } from '../../state/service.actions';
import { getServiceSelector, State } from '../../state/service.reducer';
import { ServiceModel } from './../../models/service.model';

@Component({
    selector: 'service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: [
        './service-detail.component.scss',
    ],
})
export class ServiceDetailComponent implements OnInit {
    public service$: Observable<ServiceModel>;
    public api: any;
    public responseApiTest;
    
    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.service$ = this.store.select(getServiceSelector);
        this.service$.subscribe(service => {
            if (service) {
                const api = this.api = JSON.parse(service.api);
                
                console.log(api.components.schemas.Input.properties, 'test');
                this.responseApiTest = api.components.schemas.Input.properties;

                // for (let [key, value] of Object.entries(api.paths)) {
                //     console.log(`kv`, key, value);
                // }
            }
        });

        this.route.params.subscribe(params => {
            this.store.dispatch(loadServiceAction({ serviceId: params.id }));
        });
    }
}
