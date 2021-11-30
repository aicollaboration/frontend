import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

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
        public matDialogRef: MatDialogRef<SolutionDeletionComponent>
    ) { }

    public ngOnInit(): void {
    }

    public saveAndClose(): void {
    }
}