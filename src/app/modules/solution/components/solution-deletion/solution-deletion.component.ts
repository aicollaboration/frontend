import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SolutionModel } from "../../models/solution.model";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: 'solution-deletion',
    templateUrl: './solution-deletion.component.html',
    styleUrls: [
        './solution-deletion.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionDeletionComponent implements OnInit {

    constructor(
        public matDialogRef: MatDialogRef<SolutionDeletionComponent>,
        @Inject(MAT_DIALOG_DATA) public solution: SolutionModel,
        private solutionService: SolutionService,
    ) { }

    public ngOnInit(): void {
    }

    public close(): void {
        this.matDialogRef.close();
    }

    public async saveAndClose(): Promise<void> {
        try {
            await this.solutionService.deleteSolution(this.solution.id);
            this.matDialogRef.close();
        }
        catch (error) {
            console.error(error);
        }
    }
}