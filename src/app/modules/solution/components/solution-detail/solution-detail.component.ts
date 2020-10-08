import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SolutionModel } from '../../models/solution.model';
import { loadSolutionAction } from '../../state/solution.actions';
import { getSolution, State } from '../../state/solution.reducer';

@Component({
    selector: 'solutions',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionDetailComponent implements OnInit {
    public solution$: Observable<SolutionModel>;

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.solution$ = this.store.select(getSolution);

        this.route.params.subscribe(params => {
            this.store.dispatch(loadSolutionAction({ solutionId: params.id }));
        });
    }
}
