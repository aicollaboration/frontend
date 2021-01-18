import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ServiceModel } from 'app/modules/service/models/service.model';
import { loadServicesAction } from 'app/modules/service/state/service.actions';
import { getErrorSelector, getServicesSelector, State } from 'app/modules/service/state/service.reducer';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';

@Component({
    selector: 'solution-overview',
    templateUrl: './solution-detail-overview.component.html',
    styleUrls: [
        './solution-detail-overview.component.scss',
    ]
})
export class SolutionDetailOverviewComponent implements OnInit {
    @Input()
    public solution: SolutionModel;

    public services$: Observable<ServiceModel[]>;
    public error$: Observable<string>;

    public constructor(private store: Store<State>) {

    }

    public ngOnInit(): void {
        this.services$ = this.store.select(getServicesSelector);
        this.error$ = this.store.select(getErrorSelector);

        this.store.dispatch(loadServicesAction());
    }
}
