import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'problem-submitter',
    templateUrl: './problem-submitter.component.html',
    styleUrls: [
        './problem-submitter.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ProblemSubmitterComponent implements OnInit {
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
