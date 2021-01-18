import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { ServiceLoaderDirective } from './service-loader.directive';

@Component({
    selector: 'service-loader',
    templateUrl: './service-loader.component.html',
})
export class ServiceLoaderComponent implements OnInit {
    @Input()
    public service: ServiceModel;

    @ViewChild(ServiceLoaderDirective, { static: true })
    public serviceLoader: ServiceLoaderDirective;

    public constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    public ngOnInit(): void {
        /*
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EmptyComponent);
        const viewContainerRef = this.serviceLoader.viewContainerRef;
        viewContainerRef.createComponent(componentFactory);
        */
    }
}
