import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadServiceAction } from '../../state/service.actions';
import { getServiceSelector, State } from '../../state/service.reducer';

@Component({
    selector: 'service',
    templateUrl: './service-detail.component.html',
    styleUrls: [
        './service-detail.component.scss',
    ],
})
export class ServiceDetailComponent implements OnInit {
    public service$: Observable<object>;

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.service$ = this.store.select(getServiceSelector);

        this.route.params.subscribe(params => {
            this.store.dispatch(loadServiceAction({ serviceId: params.id }));
        });
    }
}