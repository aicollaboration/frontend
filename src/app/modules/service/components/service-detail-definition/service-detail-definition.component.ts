import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';

interface MethodType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'service-detail-definition',
  templateUrl: './service-detail-definition.component.html',
  styleUrls: ['./service-detail-definition.component.scss'],
})
export class ServiceDetailDefinitionComponent implements OnInit {
  @Input()
  public service: ServiceModel;

  public definitionForm: FormGroup;
  public items: FormArray;

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
  ) { }

  public ngOnInit(): void {
    this.definitionForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()])
    });

    this.route.parent.data.subscribe(data => {
      debugger
      this.service = data.service;
      this.definitionForm.patchValue(this.service.definition);
    });
  }

  public async onSubmit(): Promise<void> {
    this.service.definition = this.definitionForm.value;
    const result = await this.serviceService.updateService(this.service, this.service.id);
  }

  public createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      endpoint: '',
      type: 'get',
      params: []
    });
  }

  public addItem(): void {
    this.items = this.definitionForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  public removeItem(index: number): void {
    this.items = this.definitionForm.get('items') as FormArray;
    this.items.removeAt(index);
  }
}
