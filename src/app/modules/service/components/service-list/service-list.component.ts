import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ServiceModel } from '../../models/service.model';
import { loadServicesAction } from '../../state/service.actions';
import { getErrorSelector, getServicesSelector, State } from '../../state/service.reducer';

@Component({
    selector: 'services',
    templateUrl: './service-list.component.html',
    styleUrls: [
        './service-list.component.scss',
    ]
})
export class ServiceListComponent implements OnInit {
    public services$: Observable<ServiceModel[]>;
    public error$: Observable<string>;

    public constructor(private store: Store<State>) {

    }

    public ngOnInit(): void {
        this.services$ = this.store.select(getServicesSelector);
        this.error$ = this.store.select(getErrorSelector);

        this.store.dispatch(loadServicesAction());

       
    }

    public openCreationDialog(): void {

    }

}
