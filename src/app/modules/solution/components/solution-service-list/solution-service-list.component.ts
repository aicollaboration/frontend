import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { SolutionModel } from "../../models/solution.model";
import { SolutionService } from "../../services/solution.service";
import { SolutionServiceCreationComponent } from "../solution-service-creation/solution-service-creation.component";

@Component({
    selector: "solution-service-list",
    templateUrl: "./solution-service-list.component.html",
    styleUrls: ["./solution-service-list.component.scss"],
})
export class SolutionServiceListComponent implements OnInit {
    public solution$: Observable<SolutionModel>;
    public solutionServices = [];
    private solutionId: string;

    public constructor(
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private solutionService: SolutionService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.route.parent.params.subscribe(async params => {
            const solutionId = this.solutionId = params.solutionId;

            this.solutionServices = await this.solutionService.getSolutionServices(solutionId);
        });
    }

    public async addService(event) {
        event.preventDefault();

        const dialogRef = this.matDialog.open(SolutionServiceCreationComponent, {
            data: {
                solutionId: this.solutionId,
            },
        });
        dialogRef.afterClosed().subscribe(async result => {
            this.solutionServices = await this.solutionService.getSolutionServices(this.solutionId);
        });
    }
}