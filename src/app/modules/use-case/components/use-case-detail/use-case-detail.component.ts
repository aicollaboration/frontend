import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UseCaseModel } from '../../models/use-case.model';
import { loadUseCaseAction } from '../../state/use-case.actions';
import { getUseCase, State } from '../../state/use-case.reducer';

@Component({
    selector: 'use-cases',
    templateUrl: './use-case-detail.component.html',
    styleUrls: ['./use-case-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseDetailComponent implements OnInit {
    public useCase$: Observable<UseCaseModel>;

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.useCase$ = this.store.select(getUseCase);

        this.route.params.subscribe(params => {
            this.store.dispatch(loadUseCaseAction({ useCaseId: params.id }));
        });
    }
}
