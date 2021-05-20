import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSolution, State } from '../../state/solution.reducer';
import { loadSolutionAction } from "../../state/solution.actions";
import { SolutionService } from "../../services/solution.service";
import { SolutionModel } from "../../models/solution.model";


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

    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        file: new FormControl(''),
       // img: new FormControl(''),
    });

    constructor(
        private solutionService: SolutionService,
        private route: ActivatedRoute,
        private store: Store<State>
    ) { }

    ngOnInit(): void {
        this.solution$ = this.store.select(getSolution);

    this.solution$.subscribe(serviceModel => {
        if (serviceModel) {
           this.solutionForm.patchValue(serviceModel)
       }
   })
        this.route.params.subscribe(params => {
            this.solutionId = params.id;
            this.store.dispatch(loadSolutionAction({ solutionId: params.id }));
        });
    }

    onSubmit() {
        console.warn(this.solutionForm.value);
    }

    public saveAndClose(): void {

    }

    public onSelect(event): void {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    public onRemove(event): void {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }
    
    updateSolution() {
        debugger;
        this.solutionService.updateSolution(this.solutionForm.value, this.solutionId).then(data => {
            console.log(data)
        });
    }
    
    uploadFile() {

    }
}
