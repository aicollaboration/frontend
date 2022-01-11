import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GithubService } from 'app/core/auth/github.service';
import { Observable } from 'rxjs';
import { RepositoryModel } from '../../models/repository.model';
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

export class SolutionCreationComponent implements OnInit {
    public namePattern: string = '^[a-zA-Z0-9\-]+';
    public solutionForm = new FormGroup({
        owner: new FormControl('aicollaborationsolutions', Validators.required),
        name: new FormControl('', { validators: [Validators.required, Validators.pattern(this.namePattern)], updateOn: 'change' }),
        description: new FormControl(''),
        visibility: new FormControl('public'),
        template: new FormControl('aicollaboration/solution-template-react-typescript'),
    });

    public constructor(
        private githubService: GithubService,
        private http: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService,
    ) { }

    public async ngOnInit(): Promise<void> {
        const userOrganizations = await this.githubService.fetchUserOrganizations();
        debugger

    }

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        try {
            // 1. Create repository
            solution.repository = await this.createRepository(solution);
        }
        finally {
            // 2. Create database entry
            const database = await this.insertSolutionInBackend(solution);

            // 3. Redirect to solution detail
            this.router.navigate(['/solutions', 'detail', database.id]);
        }
    }

    private async createRepository(solution: SolutionModel): Promise<RepositoryModel> {
        const url = `https://api.github.com/repos/${solution.template}/generate`;
        const data = {
            "owner": solution.owner,
            "name": solution.name,
        };
        const headers: HttpHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${this.githubService.getToken()}`,
        });
        return await this.http.post<RepositoryModel>(url, data, { headers }).toPromise();
    }
    
    private async insertSolutionInBackend(solutionData: SolutionModel): Promise<SolutionModel> {
        return await this.solutionService.createSolution(solutionData);
    }

}