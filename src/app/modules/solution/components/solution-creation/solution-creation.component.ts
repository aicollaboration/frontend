import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SolutionModel } from '../../models/solution.model';
import { SolutionService } from '../../services/solution.service';


@Component({
    selector: 'solution-creation',
    templateUrl: './solution-creation.component.html',
    styleUrls: [
        './solution-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class SolutionCreationComponent {
    solution: SolutionModel[];
    solutionModel = new SolutionModel();
    public files: File[] = [];
    messageTrue: boolean = false;

    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        file: new FormControl(''),
});

public constructor(private solutionService: SolutionService) { }

public async onSubmit() {
    const solution: SolutionModel = {
        ...this.solutionForm.value,
    };

    if (this.files.length > 0) {
        const file = await this.solutionService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
        solution.file = file.Key;
    }

    this.solutionService.createSolution(this.solutionForm.value)
          .then(data => {
            console.log(data)
            this.messageTrue=true;
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
    
}