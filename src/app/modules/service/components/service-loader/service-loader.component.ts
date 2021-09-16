import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { PdfAnalyzerComponent } from '../pdf-analyzer/pdf-analyzer.component';
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
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PdfAnalyzerComponent);
        const viewContainerRef = this.serviceLoader.viewContainerRef;
        viewContainerRef.createComponent(componentFactory);
    }
}
