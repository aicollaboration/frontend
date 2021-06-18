import { Component, Input, OnInit } from '@angular/core';
import { ServiceModel } from 'app/modules/service/models/service.model';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { SolutionService } from '../../services/solution.service';

@Component({
    selector: 'solution-overview',
    templateUrl: './solution-detail-overview.component.html',
    styleUrls: [
        './solution-detail-overview.component.scss',
    ]
})
export class SolutionDetailOverviewComponent implements OnInit {
    @Input()
    public solution: SolutionModel;
    public solutionServices = [];

    public services$: Observable<ServiceModel[]>;
    public error$: Observable<string>;

    public constructor(private solutionService: SolutionService) {
    }

    public async ngOnInit(): Promise<void> {
        this.solutionServices = await this.solutionService.getSolutionServices(this.solution.id);
    }
}
