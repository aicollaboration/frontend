import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel } from '../../models/service.model';

@Component({
    selector: 'services',
    templateUrl: './service-list.component.html',
    styleUrls: [
        './service-list.component.scss',
    ]
})
export class ServiceListComponent implements OnInit {
    public services: ServiceModel[];

    public constructor(private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.services = data.services;
        });
    }

    public openCreationDialog(): void {
    }
}