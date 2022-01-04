import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    public namePattern: string = '^[a-zA-Z0-9\-]+';
    public solutionForm = new FormGroup({
        owner: new FormControl('', Validators.required),
        name: new FormControl('', { validators: [Validators.required, Validators.pattern(this.namePattern)], updateOn: 'change' }),
        description: new FormControl(''),
        visibility: new FormControl('public'),
    });

    public constructor(
        private http: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService
    ) { }

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        debugger

        // 1. Create repository
        solution.repository = await this.createRepository(solution);

        // 2. Create database entry
        const database = await this.insertSolutionInBackend(solution);

        // 3. Redirect to solution detail
        this.router.navigate(['/solutions', 'detail', database.id]);
    }

    private async createRepository(solution: SolutionModel) {
        const url = 'https://api.github.com/repos/aicollaboration/solution-template-react/generate';
        const data = {
            "owner": solution.owner,
            "name": solution.name,
        };
        try {
            const headers: HttpHeaders = new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            });
            return await this.http.post(url, data, { headers }).toPromise();
        }
        catch (error) {
            console.log(error);
            debugger
        }
    }
    private async insertSolutionInBackend(solutionData: SolutionModel): Promise<SolutionModel> {
        return await this.solutionService.createSolution(solutionData);
    }

}