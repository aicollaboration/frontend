import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _ from 'lodash';
@Component({
  selector: 'app-material-text',
  templateUrl: './material-text.component.html',
  styleUrls: ['./material-text.component.scss']
})
export class MaterialTextComponent implements  OnInit, OnDestroy {
  
  @Input() formControlName: string;
  @Input() componentData;
  
  @Input() form;
  
  formName: FormGroup;
  cmpId;
  ngmodelname;
  modelValue;
  

  constructor() { }
  public ngOnInit(): void {
    if (this.componentData) {
      // console.log('this.componentData', this.componentData);
      this.cmpId = _.clone(this.componentData.component_id);
      this.ngmodelname = this.componentData.ng_model;
    }
  
    // initializing form

    if (this.form) {
      const abc = this.ngmodelname;

    } else {
      this.form = new FormGroup({});
      const abc = this.componentData.ng_model;
      this.form.addControl(abc, new FormControl());
      // this.form.controls[this.ngmodelname].setValue('');
      //       this.modelValue = '';
    }

    




  }
  // init end






  // on change of a model value onclick button
  onChange(key, value, data): any {
    console.log('repeated', key, value, data);
   
  }


  public ngOnDestroy(): void {
    // this.logIt(`onDestroy`);
    if (this.form) {
      this.form.removeControl(this.ngmodelname);
      this.form.updateValueAndValidity();
    }
  }




}
