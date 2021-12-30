import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    public solutionForm = new FormGroup({
        name: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
        description: new FormControl(''),
        visibility: new FormControl('public'),
    });

    public constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService
    ) { }   

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        this.solutionService.createSolution(solution).then(data => {
            this.snackBar.open(`You created a solution successfully!`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });

            /*
            try {
                const url = 'https://api.github.com/repos/aicollaborationsolutions/solution/generate';

                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);

                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer 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');
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                    }
                };

                const data = `{
                    "owner":"aicollaborationsolutions", 
                    "name": "tobias"
                }`;

                xhr.send(data);



            } catch (e) {
                console.log('error');
            } finally {
                //    alert("success");
                //this.apiCallCreateJob();
            }
            */

            this.router.navigate(['/solutions', 'detail', data.id]);
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });
    }

}