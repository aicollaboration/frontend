import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit, OnDestroy {

   @Input() componentData;
   @Input() form;
    @Input() data;

  //   formName: FormGroup;
    cmpId;
    ngmodelname;
    modelValue;

  constructor() { }

  ngOnInit(): void {
    
    console.log(this.componentData, 'data', this.data);
    this.cmpId = this.componentData.key;
    this.ngmodelname = this.componentData.key;

    if (this.form) {
       const abc = this.ngmodelname;
       this.form.addControl(abc, new FormControl());
  
    } else {
        this.form = new FormGroup({});
        const abc = this.componentData.key;
        this.form.addControl(abc, new FormControl());
        // this.form.controls[this.ngmodelname].setValue('');
        //       this.modelValue = '';
    }

  }

  

  // implements  OnInit, OnDestroy {
  
  //   @Input() formControlName: string;
    
  //   @Input() form;
    
  //   formName: FormGroup;
  //   cmpId;
  //   ngmodelname;
  //   modelValue;
    
  
    // constructor() { }
    // public ngOnInit(): void {
    
      // initializing form
  
      // if (this.form) {
      //   const abc = this.ngmodelname;
  
      // } else {
      //   this.form = new FormGroup({});
      //   const abc = this.componentData.ng_model;
      //   this.form.addControl(abc, new FormControl());
      //   // this.form.controls[this.ngmodelname].setValue('');
      //   //       this.modelValue = '';
      // }
  
      
  
  
  
  
    // }
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




