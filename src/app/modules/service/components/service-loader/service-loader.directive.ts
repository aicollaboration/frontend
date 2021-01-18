import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[serviceLoader]'
})
export class ServiceLoaderDirective {
    public constructor(public viewContainerRef: ViewContainerRef) { }
}
