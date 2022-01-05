import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SolutionModel } from "../../models/solution.model";

@Component({
    selector: "solution-detail-home",
    templateUrl: "./solution-detail-home.component.html",
    styleUrls: [
        "./solution-detail-home.component.scss",
    ],
})
export class SolutionDetailHomeComponent implements OnInit {
    public solution: SolutionModel;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.route.parent.data.subscribe((data) => {
            this.solution = data.solution;
        });
    }

}