import { ComponentInjector } from './component-injector';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  StaticProvider,
  SimpleChanges,
  Type,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: ''
})
export class DynamicComponent implements OnChanges, ComponentInjector {

  @Input() appDynamicComponent: Type<any>;
  @Input() appDynamicInjector: Injector;
  @Input() appDynamicProviders: StaticProvider[];
  @Input() appDynamicContent: any[][];

  @Output() appDynamicCreated: EventEmitter<ComponentRef<any>> = new EventEmitter();

  componentRef: ComponentRef<any> | null;

  constructor(
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appDynamicComponent']) {
      this.createDynamicComponent();
    }
  }

  createDynamicComponent() {
    this._vcr.clear();
    this.componentRef = null;

    if (this.appDynamicComponent) {
      this.componentRef = this._vcr.createComponent(
        this._cfr.resolveComponentFactory(this.appDynamicComponent),
        0, this._resolveInjector(), this.appDynamicContent
      );
      this.appDynamicCreated.emit(this.componentRef);
    }
  }

  private _resolveInjector(): Injector {
    let injector = this.appDynamicInjector || this._vcr.parentInjector;

    if (this.appDynamicProviders) {
      injector = Injector.create({
        providers: this.appDynamicProviders,
        parent: injector,
      });
    }

    return injector;
  }

}
