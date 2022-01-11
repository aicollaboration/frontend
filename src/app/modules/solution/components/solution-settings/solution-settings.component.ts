import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { SolutionModel } from "../../models/solution.model";
import { SolutionDeletionComponent } from "../solution-deletion/solution-deletion.component";

@Component({
    selector: "solution-settings",
    templateUrl: "./solution-settings.component.html",
    styleUrls: ["./solution-settings.component.scss"],
})
export class SolutionSettingsComponent implements OnInit {
    public solution: SolutionModel;

    constructor(
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.route.parent.data.subscribe(async data => {
            this.solution = data.solution;
        });
    }

    public openDeleteDialog(): void {
        const dialogRef = this.matDialog.open(SolutionDeletionComponent, { data: this.solution });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // forward to solution list
            this.router.navigate(["/solutions"]);
        });
    }

    public openDomainDialog(): void {
        /*
        const dialogRef = this.matDialog.open(SolutionDomainComponent, { data: this.solution });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // forward to solution list
            this.router.navigate(["/solutions"]);
        });
        */
    }
}