import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'solution-deployment',
    templateUrl: './solution-deployment.component.html',
    styleUrls: [
        './solution-deployment.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionDeploymentComponent implements OnInit {
    public solutionForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<SolutionDeploymentComponent>,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.solutionForm = this.formBuilder.group({
            name: new FormControl(),
        });
    }

    public saveAndClose(): void {
    }
}
