import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { ServiceModel } from "app/modules/service/models/service.model";
import { loadServicesAction } from "app/modules/service/state/service.actions";
import { getServicesSelector, State as ServiceState } from "app/modules/service/state/service.reducer";
import { Observable } from "rxjs";
import { SolutionServiceModel } from "../../models/solution-service.model";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: 'solution-service-creation',
    templateUrl: './solution-service-creation.component.html',
    styleUrls: [
        './solution-service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionServiceCreationComponent implements OnInit {
    public services$: Observable<ServiceModel[]>;

    public solutionServiceForm = new FormGroup({
        solutionId: new FormControl(''),
        serviceId: new FormControl(''),
    });

    public constructor(
        private dialogRef: MatDialogRef<SolutionServiceCreationComponent>,
        private serviceStore: Store<ServiceState>,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    public ngOnInit(): void {
        this.solutionServiceForm.patchValue({
            solutionId: this.data.solutionId
        });

        this.services$ = this.serviceStore.select(getServicesSelector);
        this.serviceStore.dispatch(loadServicesAction());
    }

    public async onSubmit(event) {
        const solutionService: SolutionServiceModel = {
            ...this.solutionServiceForm.value,
        };

        try {
            const data = await this.solutionService.addSolutionService(solutionService);
            this.snackBar.open('Success', '', { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' });
            this.dialogRef.close();
        } catch (error) {
            this.snackBar.open('Error');
            console.error(error);
        }
    }

}