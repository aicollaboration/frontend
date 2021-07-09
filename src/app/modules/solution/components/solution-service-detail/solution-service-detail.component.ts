import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { SolutionModel } from "../../models/solution.model";
import { SolutionService } from "../../services/solution.service";
import { fromSchema } from '@openapi-contrib/openapi-schema-to-json-schema';

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
        this.route.params.subscribe(async params => {
            this.solutionId = params.solutionId;
            this.serviceId = params.serviceId;

            const solutionService = await this.solutionService.getSolutionService(this.solutionId, this.serviceId);

            debugger


            // fromSchema()
        });
    }
}