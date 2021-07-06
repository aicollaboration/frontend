import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MaterialTextComponent
} from '../FormComponents/field-input/material-text.component';


@Component({
  selector: 'app-dynamic-child',
  templateUrl: './dynamic-child.component.html',
  styleUrls: ['./dynamic-child.component.scss']
})
export class DynamicChildComponent implements OnInit {

  @Input() componentData;
 

   cmpList = {
    'text': MaterialTextComponent,
     };
  

  inputs = {};
  outputs = {};
  outputsDataObj = {};
  component;
  components = [];
  form;


  constructor() {
  }

  public ngOnInit(): void {

    console.log('Sure i got it');

    this.scanComponent(this.componentData);
    this.form = new FormGroup({
    });
   }


  public scanComponent(obj): any {
    if (obj.form_element) {

      // console.log(obj.form_element, 'inside scan dynamic child');

      for (const x of obj.form_element) {
        // this.scanComponent(x);
        // console.log(x,'inside x dynamic child');
        const componentEvent = x.event;
        // console.log('componentEvent', componentEvent);
        const cmpName = x.ui_type;
        // console.log(cmpName, 'cmpName Frm child');
        if (this.cmpList[cmpName]) {
          // console.log(' loading child fn=scancomponent', cmpName);
          this.loadComponent(cmpName, x);
          // console.log(x.control_json, 'x.control_json', cmpName);
        }
      }
    }
  }

  public loadComponent(cmpName, componentData): any {
    const cmpNameC = this.cmpList[cmpName];
    // console.log(cmpNameC, 'cmpNameC');
    const inputsDataObj = {
      componentData: componentData,
    };


    const obj = {
      'name': cmpNameC,
      'inputs': inputsDataObj
    };
    // console.log('obj==>',obj);
    this.components.push(obj);
  }
}
