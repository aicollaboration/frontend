import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceModel } from '../../models/service.model';

interface MethodType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'service-detail-definition',
  templateUrl: './service-detail-definition.component.html',
  styleUrls: ['./service-detail-definition.component.scss'],
})
export class ServiceDetailDefinitionComponent {
  @Input()
  public service: ServiceModel;

  public methodTypes: MethodType[] = [
    { value: 'get', viewValue: 'GET' },
    { value: 'post', viewValue: 'POST' },
    { value: 'delete', viewValue: 'DELETE' },
    { value: 'put', viewValue: 'PUT' },
    { value: 'patch', viewValue: 'PATCH' },
  ];

  public dataTypes: MethodType[] = [
    { value: 'string', viewValue: 'string' },
    { value: 'number', viewValue: 'number' },
    { value: 'array', viewValue: 'array' },
    { value: 'object', viewValue: 'object' }
  ];

  public mediaTypes: MethodType[] = [
    { value: 'applicationjson', viewValue: 'application/json' },
    { value: 'formdata', viewValue: 'form-data' }
  ];

  constructor(private formBuilder: FormBuilder) { }

  public checkoutForm = this.formBuilder.array([this.createItem()]);

  public onSubmit(): void {
    debugger
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  public createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      endpoint: '',
      type: 'get',
    });
  }

  public addItem(): void {
    this.checkoutForm.push(this.createItem());
  }
}
