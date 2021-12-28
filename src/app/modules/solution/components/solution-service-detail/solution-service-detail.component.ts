import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { SolutionModel } from "../../models/solution.model";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: 'solution-service-detail',
    templateUrl: './solution-service-detail.component.html',
    styleUrls: [
        './solution-service-detail.component.scss',
    ],
})
export class SolutionServiceDetailComponent implements OnInit {
    public solution$: Observable<SolutionModel>;
    private solutionId: string;
    private serviceId: string;

    public constructor(
        private route: ActivatedRoute,
        private solutionService: SolutionService,
    ) {
    }

    public ngOnInit(): void {
        debugger
        Promise.all([
            this.route.params.toPromise(),
            this.route.parent.params.toPromise(),
        ])
            .then(async ([params, parentParams]) => {
                debugger
                this.solutionId = parentParams.solutionId;
                this.serviceId = params.serviceId;

                const solutionService = await this.solutionService.getSolutionService(this.solutionId, this.serviceId);
            })
            .catch(error => {
                debugger
            })
            .finally(() => {
                debugger
            });
    }
}