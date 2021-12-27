import { Component, Input } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  methodtype: MethodType[] = [
    { value: 'get', viewValue: 'get' },
    { value: 'post', viewValue: 'post' },
    { value: 'delete', viewValue: 'delete' },
    { value: 'put', viewValue: 'put' },
    { value: 'patch', viewValue: 'patch' },
  ];

  dataType: MethodType[] = [
    { value: 'string', viewValue: 'string' },
    { value: 'number', viewValue: 'number' },
    { value: 'array', viewValue: 'array' },
    { value: 'object', viewValue: 'object' }
  ];

  mediaType: MethodType[] = [
    { value: 'applicationjson', viewValue: 'application/json' },
    { value: 'formdata', viewValue: 'form-data' }
  ];

  constructor(private formBuilder: FormBuilder) {}

  checkoutForm = this.formBuilder.group({
    name: '',
    description: '',
    endpoint: '',
    type: '',
  });

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
