import { Component, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { SolutionServiceModel } from "../../models/solution-service.model";
import { SolutionService } from "../../services/solution.service";
import { SolutionServiceDeletionComponent } from "../solution-service-deletion/solution-service-deletion.component";

@Component({
    selector: 'solution-service-detail',
    templateUrl: './solution-service-detail.component.html',
    styleUrls: [
        './solution-service-detail.component.scss',
    ],
})
export class SolutionServiceDetailComponent implements OnInit {
    public solutionServiceModel: SolutionServiceModel;
    public solutionId: string;
    public form: FormGroup;

    public constructor(
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private solutionService: SolutionService,
    ) {
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            id: new FormControl(),
            name: new FormControl(),
            description: new FormControl(),
            public: new FormControl(),
        });

        combineLatest([
            this.route.params,
            this.route.parent.params,
        ]).subscribe(async ([params, parentParams]) => {
            this.solutionId = params.solutionId;
            this.solutionServiceModel = await this.solutionService.getSolutionService(parentParams.solutionId, params.serviceId);

            this.form.patchValue(this.solutionServiceModel);
        }, (error) => {
            console.error(error);
        });
    }

    public openDeleteDialog(): void {
        const dialogRef = this.matDialog.open(SolutionServiceDeletionComponent, { data: this.solutionServiceModel });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // forward to solution detail
            debugger
            this.router.navigate(["/solutions", "detail", this.solutionId, "services", this.solutionServiceModel.service.id]);
        });
    }

    public onSubmit(): void {
        this.solutionService.updateSolutionService(this.form.value).then(() => {
            // forward to solution detail
            this.router.navigate(["/solutions", "detail", this.solutionId]);
        });
    }
}