import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { loadSolutionAction } from '../../state/solution.actions';
import { getSolution, State } from '../../state/solution.reducer';

@Component({
    selector: 'solution',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
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
        this.solution$ = this.store.select(getSolution);

        this.route.params.subscribe(params => {
            this.store.dispatch(loadSolutionAction({ solutionId: params.id }));
        });
    }

    public openCreationDialog(): void {
      const dialogRef = this.matDialog.open(SolutionDeploymentComponent);
    }
}
