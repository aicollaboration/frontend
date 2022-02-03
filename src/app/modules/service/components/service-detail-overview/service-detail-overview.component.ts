import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceModel } from "../../models/service.model";

@Component({
    selector: 'service-detail-overview',
    templateUrl: './service-detail-overview.component.html',
    styleUrls: [
        './service-detail-overview.component.scss',
    ],
})
export class ServiceDetailOverviewComponent implements OnInit {
    public service: ServiceModel;

    constructor(private route: ActivatedRoute) {

    }
    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.service = data.service;
        });
    }

}