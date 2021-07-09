import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSolutionSelector, State } from '../../state/solution.reducer';
import { loadSolutionAction } from "../../state/solution.actions";
import { SolutionService } from "../../services/solution.service";
import { SolutionModel } from "../../models/solution.model";
import { MatTableDataSource } from '@angular/material/table';
import { SolutionServiceCreationComponent } from "../solution-service-creation/solution-service-creation.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'solution-editor',
    templateUrl: './solution-editor.component.html',
    styleUrls: [
        './solution-editor.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class SolutionEditorComponent implements OnInit {
    public solution$: Observable<SolutionModel>;
    public solution: SolutionModel;
    public solutionModel = new SolutionModel();
    private solutionId: string;
    public files: File[] = [];

    public serviceColumns: string[] = ['id', 'solutionId', 'serviceId'];
    public solutionServiceDataSource = new MatTableDataSource([]);
    public solutionServices = [];

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
    ) { }

    public async ngOnInit(): Promise<void> {
        this.solution$ = this.store.select(getSolutionSelector);

        this.solution$.subscribe(solutionModel => {
            if (solutionModel) {
                this.loadSolution(solutionModel)
            }
        })
        this.route.params.subscribe(async params => {
            const solutionId = params.id;

            this.solutionId = params.id;
            this.store.dispatch(loadSolutionAction({ solutionId }));
            
            this.solutionServices = await this.solutionService.getSolutionServices(solutionId);
        });

    }

    public async loadSolution(solutionModel: SolutionModel) {
        this.solutionForm.patchValue(solutionModel);

        if (solutionModel.file) {
            const foo = await this.solutionService.getFile(solutionModel.file);
        }
    }

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        if (this.files.length > 0) {
            const file = await this.solutionService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
            solution.file = file.Key;
        }

        this.solutionService.updateSolution(solution, this.solutionId).then(data => {
            this.store.dispatch(loadSolutionAction({ solutionId: this.solutionId }));
            this.snackBar.open(`Solution successful updated`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });
    }

    public onSelect(event): void {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    public onRemove(event): void {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
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

}
