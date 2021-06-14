import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSolution, State } from '../../state/solution.reducer';
import { loadSolutionAction } from "../../state/solution.actions";
import { SolutionService } from "../../services/solution.service";
import { SolutionModel } from "../../models/solution.model";
import { MatTableDataSource } from '@angular/material/table';
import { SolutionServiceCreationComponent } from "../solution-service-creation/solution-service-creation.component";
import { MatDialog } from "@angular/material/dialog";

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
    public editSolutionTrue: boolean = false;
    public addSolutionTrue: boolean = false;

    public serviceColumns: string[] = ['id', 'solutionId', 'serviceId'];
    public solutionServiceDataSource = new MatTableDataSource([]);
    public solutionServices = [];
    public list = { id: '2', solutionId: '2', serviceId: '3' };

    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        file: new FormControl(''),
    });

    public constructor(
        public solutionService: SolutionService,
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private store: Store<State>
    ) { }

    public async ngOnInit(): Promise<void> {
        this.solution$ = this.store.select(getSolution);

        this.solution$.subscribe(solutionModel => {
            if (solutionModel) {
                this.loadSolution(solutionModel)
            }
        })
        this.route.params.subscribe(params => {
            this.solutionId = params.id;
            this.store.dispatch(loadSolutionAction({ solutionId: params.id }));
        });

        this.solutionServices = await this.solutionService.getSolutionServices('22');
        this.solutionServiceDataSource.data = this.solutionServices;
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
            // @todo success
            this.store.dispatch(loadSolutionAction({ solutionId: this.solutionId }));
            this.editSolutionTrue = true;
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
        
        const dialogRef = this.matDialog.open(SolutionServiceCreationComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log('Compose dialog was closed!');
        });


        /*
        const solutionService = {
            solutionId: '2',
            serviceId: '3'
        };

        const data = await this.solutionService.addSolutionService(solutionService);
        debugger

        this.solutionServices.push(solutionService);
        this.solutionServiceDataSource.filter = "";
        this.addSolutionTrue = true;
        */
    }
}
