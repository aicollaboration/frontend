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
    editSolutionTrue: boolean = false; 
    addSolutionTrue: boolean = false; 

    serviceColumns: string[] = ['id', 'solutionId', 'serviceId'];
    solutionServiceDataSource = new MatTableDataSource([]);
    public solutionServices = [];
    list =  {id:'2', solutionId:'2', serviceId:'3' };  



    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        file: new FormControl(''),
    });

    public constructor(
        public solutionService: SolutionService,
        private route: ActivatedRoute,
        private store: Store<State>
    ) { }

    public async ngOnInit(): Promise<void>{
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

        this.solutionServices =  await this.solutionService.getSolutionServices('22');
        this.solutionServiceDataSource.data = this.solutionServices;
    }

    public async loadSolution(solutionModel: SolutionModel) {
        this.solutionForm.patchValue(solutionModel);

        if (solutionModel.file) {
            const foo = await this.solutionService.getFile(solutionModel.file);
        }        
    }S

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
            this.editSolutionTrue=true;
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
    
    public addService() {
        debugger;
        this.solutionServices.push(this.list);
        this.solutionServiceDataSource.filter = "";
        this.addSolutionTrue=true;
 /*
        debugger;
        this.solutionServiceDataSource.data.push(this.list.length + 1);
         this.solutionServiceDataSource.filter = "";
/*
         this.solutionServices =  await this.solutionService.createSolution(model);
         this.solutionServiceDataSource.data = this.solutionServices;

/*
        this.solutionServiceDataSource(model). push(model); 
        this.model = this.solutionServiceDataSource;//add the new model object to the dataSource
     //   this.solutionServiceDataSource = [...this.solutionServiceDataSource];  //refresh the dataSource
        this.addSolutionTrue=true;
       // this.dataSource = [];
       /*

   this.dataSource = [...this.dataSource];  //refresh the dataSource

        this.dataSource.data.push(this.createNewUser(this.dataSource.data.length + 1));
    this.dataSource.filter = "";
    */
    }
}
