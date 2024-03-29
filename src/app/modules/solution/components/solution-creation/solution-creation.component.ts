import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SolutionModel } from '../../models/solution.model';
import { SolutionTemplateService } from '../../services/solution-template.service';
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
    public solution: SolutionModel[];
    public solutionModel = new SolutionModel();
    public files: File[] = [];

    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        template: new FormControl(),
        owner: new FormControl(),
    });
    public types = [
        {
            value: 'app',
            label: 'App',
        },
    ];
    public templates = [
        {
            name: 'Name',
            description: 'description',
        },
    ];
    public owners = [{
        id: 1,
        name: 'Tobias Oberrauch'
    }];

    public constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService,
        private solutionTemplateService: SolutionTemplateService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.templates = await this.solutionTemplateService.getSolutionTemplates();
    }

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        if (this.files.length > 0) {
            const file = await this.solutionService.uploadFile(Math.random().toString(36).substring(7), this.files[0]);
            solution.file = file.Key;
        }

        this.solutionService.createSolution(this.solutionForm.value).then(data => {
            this.snackBar.open(`You created a solution successfully!`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
            this.router.navigate(['/solutions', 'detail', data.id]);
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
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

    public selectTemplate(template) {
        if (template.id === this.solutionForm.value.template) {
            this.solutionForm.patchValue({
                template: null,
            });
        } else {
            this.solutionForm.patchValue({
                template: template.id,
            });
        }
    }

}