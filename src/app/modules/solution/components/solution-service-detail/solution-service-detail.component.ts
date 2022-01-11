import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { SolutionServiceModel } from "../../models/solution-service.model";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: 'solution-service-detail',
    templateUrl: './solution-service-detail.component.html',
    styleUrls: [
        './solution-service-detail.component.scss',
    ],
})
export class SolutionServiceDetailComponent implements OnInit {
    public solutionServiceModel: SolutionServiceModel;

    public constructor(
        private route: ActivatedRoute,
        private solutionService: SolutionService,
    ) {
    }

    public ngOnInit(): void {
        combineLatest([
            this.route.params,
            this.route.parent.params,
        ]).subscribe(async ([params, parentParams]) => {
            this.solutionServiceModel = await this.solutionService.getSolutionService(parentParams.solutionId, params.serviceId);
        }, (error) => {
            console.error(error);
        });
    }
}