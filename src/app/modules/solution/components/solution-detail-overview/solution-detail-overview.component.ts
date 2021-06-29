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

    public content = `<img src="https://static.tildacdn.com/tild3966-3631-4135-b431-343034393564/1_lisTH_05bh13SHyADk.png"
                    alt="" /><br />
                <p> Page layouts are set of pre-made layouts that can be used as the starter on any page/app design.
                    While they provide some styling by default, it's very minimal and can be easily modified from the
                    component you create. </p>
                <br />
                <ul>
                    <li>
                        <p><strong>Consistency</strong></p> Your apps and pages will all look similar in terms of layout
                        and general styling which essentially make them more user friendly and easy to
                        learn.<br /><br />
                    </li>
                    <li>
                        <p><strong>Easy modifications</strong></p> In the future, if you decide to change the design of
                        your pages, add elements or modify the existing ones, it can be done very easily since all your
                        pages will be sharing same class names and the general code structure.<br /><br />
                    </li>
                    <li>
                        <p><strong>Easier learning curve for your users</strong></p> Making the general design and
                        layout of your pages similar will make them easier to learn for your users. They won't be
                        looking for a save button or a search field over and over again, trying to find and memorize
                        their locations for each page since all pages will be sharing a similar structure.
                    </li>
                </ul>
    `;

    public constructor(private solutionService: SolutionService) {
    }

    public async ngOnInit(): Promise<void> {
        this.solutionServices = await this.solutionService.getSolutionServices(this.solution.id);
    }

    public update() {
        debugger
    }

    public cancel() {
        debugger
    }
}
