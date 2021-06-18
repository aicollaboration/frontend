import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { loadSolutionAction } from '../../state/solution.actions';
import { getSolutionSelector, State } from '../../state/solution.reducer';
import { SolutionDeploymentComponent } from '../solution-deployment/solution-deployment.component';

@Component({
    selector: 'solution',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SolutionDetailComponent implements OnInit {
    public solution$: Observable<SolutionModel>;

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>,
        private matDialog: MatDialog
    ) {
    }

    public ngOnInit(): void {
        this.solution$ = this.store.select(getSolutionSelector);

        this.route.params.subscribe(async params => {
            const solutionId = params.id;
            this.store.dispatch(loadSolutionAction({ solutionId }));
        });
    }

    public openCreationDialog(): void {
        const dialogRef = this.matDialog.open(SolutionDeploymentComponent);
    }
}
