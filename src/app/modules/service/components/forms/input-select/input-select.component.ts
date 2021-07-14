import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
interface Structure {
  value: string;
  viewValue: string;
  key: string;
}
@Component({
  selector: "app-input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.scss"],
})
export class InputSelectComponent implements OnInit, OnDestroy {

  @Input() componentData;
  @Input() form;
   @Input() data;

 //   formName: FormGroup;
   cmpId;
   ngmodelname;
   modelValue;

  constructor() {}

  public datas: Structure[];
  // { value: 'steak-0', viewValue: 'Steak' },
  // { value: 'pizza-1', viewValue: 'Pizza' },
  // { value: 'tacos-2', viewValue: 'Tacos' },
  // ];

  ngOnInit(): void {
    this.datas = this.componentData.options;

    console.log(this.componentData, 'data', this.data);
    this.cmpId = this.componentData.key;
    this.ngmodelname = this.componentData.key;
    console.log();

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
