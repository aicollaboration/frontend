import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { SolutionService } from '../../services/solution.service';
import { loadSolutionAction } from '../../state/solution.actions';
import { getSolutionSelector, State } from '../../state/solution.reducer';
import { SolutionDeploymentComponent } from '../solution-deployment/solution-deployment.component';
import { SolutionServiceCreationComponent } from '../solution-service-creation/solution-service-creation.component';

@Component({
    selector: 'solution',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SolutionDetailComponent implements OnInit {
    public solution$: Observable<SolutionModel>;
    public types = [
        {
            value: 'value',
            label: 'label',
        },
    ];
    public statuses = [
        {
            value: 'value',
            label: 'label',
        },
    ];
    public solutionServices = [];
    private solutionId: string;
    
    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
    });

    public constructor(
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService,
        private store: Store<State>,
    ) {
    }

    public ngOnInit(): void {
        this.solution$ = this.store.select(getSolutionSelector);

        this.route.params.subscribe(async params => {
            const solutionId = this.solutionId = params.solutionId;
            this.store.dispatch(loadSolutionAction({ solutionId }));
            
            this.solutionServices = await this.solutionService.getSolutionServices(solutionId);
        });
    }

    public openCreationDialog(): void {
        const dialogRef = this.matDialog.open(SolutionDeploymentComponent);
    }

    public async addService(event) {
        event.preventDefault();

        const dialogRef = this.matDialog.open(SolutionServiceCreationComponent, {
            data: {
                solutionId: this.solutionId,
            },
        });
        dialogRef.afterClosed().subscribe(async result => {
            this.solutionServices = await this.solutionService.getSolutionServices(this.solutionId);
        });
    }

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        this.solutionService.updateSolution(solution, this.solutionId).then(data => {
            this.store.dispatch(loadSolutionAction({ solutionId: this.solutionId }));
            this.snackBar.open(`Solution successful updated`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });
    }
}
