/* import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'solution-creation',
    templateUrl: './solution-creation.component.html',
    styleUrls: [
        './solution-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionCreationComponent implements OnInit {
    public solutionForm: FormGroup;
    public files: File[] = [];

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.solutionForm = this.formBuilder.group({
            name: new FormControl(),
            description: new FormControl(),
            problem: new FormControl(),
        });
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
}
*/

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

service: SolutionModel[];
solutionModel = new SolutionModel();

constructor(private solutionService: SolutionService) { }

solutionForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    img : new FormControl(''),
});

    onSubmit() {
        console.warn(this.solutionForm.value);

    }

    addSolution() {
        this.solutionService.createSolution(this.solutionForm.value)
            .then(data => {
                console.log(data)
            })
    }
}
