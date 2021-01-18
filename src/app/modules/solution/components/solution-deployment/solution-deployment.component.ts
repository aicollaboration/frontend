import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService, CreateSolutionInput, CreateSolutionMutation } from 'app/API.service';

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
        private apiService: APIService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.solutionForm = this.formBuilder.group({
            name: new FormControl(),
        });
    }

    public saveAndClose(): void {
        const input: CreateSolutionInput = this.solutionForm.value;

        this.apiService.CreateSolution(input)
            .then((solution: CreateSolutionMutation) => {
                console.log('CreateSolution then', solution);

                this.router.navigate(['solutions', solution.id]);
            })
            .catch((reason: any) => {
                console.log('CreateSolution catch', reason);
            })
            .finally(() => {
                console.log('CreateSolution finally');
                this.matDialogRef.close();
            });

    }
}
