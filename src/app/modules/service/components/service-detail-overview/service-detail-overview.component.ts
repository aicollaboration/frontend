import { Component, Input } from "@angular/core";
import { ServiceModel } from "../../models/service.model";

@Component({
    selector: 'service-detail-overview',
    templateUrl: './service-detail-overview.component.html',
    styleUrls: [
        './service-detail-overview.component.scss',
    ],
})
export class ServiceDetailOverviewComponent {
    @Input()
    public service: ServiceModel;
}