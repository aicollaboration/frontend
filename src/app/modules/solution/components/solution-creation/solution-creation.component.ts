import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from 'app/shared/services/github/github.service';
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
    public owners: any[] = [];
    public namePattern: string = '^[a-zA-Z0-9\-]+';
    public solutionForm = new FormGroup({
        owner: new FormControl('aicollaborationsolutions', Validators.required),
        name: new FormControl('', { validators: [Validators.required, Validators.pattern(this.namePattern)], updateOn: 'change' }),
        description: new FormControl(''),
        visibility: new FormControl('public'),
        template: new FormControl('aicollaboration/solution-template-react-typescript'),
    });
    public isLoading = false;
    public loadingMessages = [];

    public constructor(
        private githubService: GithubService,
        private router: Router,
        private solutionService: SolutionService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.githubService.fetchUserInfo().then(userInfo => {
            this.owners = [{
                id: 'aicollaborationsolutions',
                name: 'aicollaborationsolutions',
            }, {
                id: userInfo['login'],
                name: userInfo['login'],
            }];
        });
    }

    public async onSubmit() {
        this.isLoading = true;

        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };
        this.loadingMessages.push('Create repository');

        try {
            solution.repository = await this.githubService.createRepository(solution.owner, solution.name, solution.template);
            this.loadingMessages.push(`Repository created: https://github.com/${this.solutionForm.value.owner}/${this.solutionForm.value.name}`);
        }
        finally {
            // 1. Create certificate in github repository by read file and commit changes
            this.loadingMessages.push('Create certificate');
            await this.githubService.createCertificate(solution.owner, solution.name);
            this.loadingMessages.push(`Certificate created: https://${this.solutionForm.value.name}.${this.solutionForm.value.owner}.aicollaboration.net`);

            // 2. Create database entry
            this.loadingMessages.push('Store in database');
            const database = await this.solutionService.createSolution(solution);
            this.loadingMessages.push(`Stored in database`);

            // 3. Redirect to solution detail
            this.router.navigate(['/solutions', 'detail', database.id]);
        }
    }
}