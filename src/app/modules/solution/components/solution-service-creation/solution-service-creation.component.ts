import { Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SolutionServiceModel } from "../../models/solution-service.model";
import { SolutionService } from "../../services/solution.service";
import { SolutionEditorComponent } from "../solution-editor/solution-editor.component";

@Component({
    selector: 'solution-service-creation',
    templateUrl: './solution-service-creation.component.html',
    styleUrls: [
        './solution-service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionServiceCreationComponent {
    public addSolutionServiceTrue: boolean = false;

    public solutionServiceForm = new FormGroup({
        solutionId: new FormControl(''),
        serviceId: new FormControl(''),
    });


    public constructor(
        public solutionService: SolutionService
    ) { }

    public async onSubmit(event) {
        const solutionService: SolutionServiceModel = {
            ...this.solutionServiceForm.value,
        };

        debugger;
        const data = await this.solutionService.addSolutionService(solutionService);
        this.addSolutionServiceTrue = true; 
    }
    
}