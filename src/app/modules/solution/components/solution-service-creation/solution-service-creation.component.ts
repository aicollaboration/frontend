import { Component, ViewEncapsulation } from "@angular/core";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: 'solution-service-creation',
    templateUrl: './solution-service-creation.component.html',
    styleUrls: [
        './solution-service-creation.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SolutionServiceCreationComponent {
    
    public constructor(
        public solutionService: SolutionService
    ) { }

    public async addService() {
        const solutionService = {
            solutionId: '2',
            serviceId: '3'
        };

        const data = await this.solutionService.addSolutionService(solutionService);
        debugger

    }
}