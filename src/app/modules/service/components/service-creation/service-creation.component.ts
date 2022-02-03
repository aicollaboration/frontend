import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { GithubService } from 'app/shared/services/github/github.service';
import { load } from 'js-yaml';
import { Observable } from 'rxjs';
import { ServiceModel } from "../../models/service.model";
import { ServiceService } from '../../services/service.service';
import { loadServicesAction } from '../../state/service.actions';
import { getErrorSelector, getServicesSelector, State } from '../../state/service.reducer';


@Component({
    selector: 'service-creation',
    templateUrl: './service-creation.component.html',
    styleUrls: [
        './service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})

export class ServiceCreationComponent implements OnInit {
    public owners: any[] = [];
    public isLoading = false;
    public loadingMessages = [];
    public namePattern: string = '^[a-zA-Z0-9\-]+';

    public services$: Observable<ServiceModel[]>;

    public service: ServiceModel;
    public serviceModel = new ServiceModel();
    public files: File[] = [];
    public error$: Observable<string>;
    public serviceNames = [];
    public allreadyPresent = "";


    public serviceForm = new FormGroup({
        owner: new FormControl('tobiasoberrauch', Validators.required),
        name: new FormControl('', { validators: [Validators.required, Validators.pattern(this.namePattern)], updateOn: 'change' }),
        description: new FormControl(''),
        visibility: new FormControl('public'),
        template: new FormControl('aicollaboration/service-template-python'),
        api: new FormControl(''),
    });

    public constructor(
        private githubService: GithubService,
        private router: Router,
        private serviceService: ServiceService,
        private snackBar: MatSnackBar,
        private store: Store<State>
    ) { }

    public ngOnInit(): void {
        this.services$ = this.store.select(getServicesSelector);
        this.error$ = this.store.select(getErrorSelector);

        this.store.dispatch(loadServicesAction());
        console.log(this.services$);

        this.services$.subscribe((res) => {
            this.serviceNames = res.map(item => item.name);
            console.log(this.serviceNames);
        }, (err) => {
            console.log('error', err);
        });

        this.githubService.fetchUserInfo().then(userInfo => {
            this.owners = [{
                id: 'aicollaborationservices',
                name: 'aicollaborationservices',
            }, {
                id: userInfo['login'],
                name: userInfo['login'],
            }];
        });
    }

    public async onSubmit(): Promise<void> {
        this.isLoading = true;

        const service: ServiceModel = {
            ...this.serviceForm.value,
        };
        this.loadingMessages.push('Create repository');

        try {
            service.repository = await this.githubService.createRepository(service.owner, service.name, service.template);
        }
        finally {
            // 1. Create certificate in github repository by read file and commit changes
            this.loadingMessages.push('Create certificate');
            await this.githubService.createCertificate(service.owner, service.name);
            this.loadingMessages.push(`Certificate created: https://${this.serviceForm.value.name}.${this.serviceForm.value.owner}.aiproduct.io`);

            // 2. Create database entry
            this.loadingMessages.push('Store in database');
            const database = await this.serviceService.createService(service);
            this.loadingMessages.push(`Stored in database`);

            // 3. Redirect to solution detail
            this.router.navigate(['/services', 'detail', database.id]);
        }
    }

}
