import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SolutionServiceModel } from "../../models/solution-service.model";
import { SolutionModel } from "../../models/solution.model";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: 'solution-service-deletion',
    templateUrl: './solution-service-deletion.component.html',
    styleUrls: [
        './solution-service-deletion.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionServiceDeletionComponent implements OnInit {

    constructor(
        public matDialogRef: MatDialogRef<SolutionServiceDeletionComponent>,
        @Inject(MAT_DIALOG_DATA) public solutionServiceModel: SolutionServiceModel,
        private solutionService: SolutionService,
    ) { }

    public ngOnInit(): void {
    }

    public close(): void {
        this.matDialogRef.close();
    }

    public async saveAndClose(): Promise<void> {
        try {
            await this.solutionService.deleteSolutionService(this.solutionServiceModel.id);
            this.matDialogRef.close(this.solutionServiceModel.id);
        }
        catch (error) {
            console.error(error);
        }
    }
}