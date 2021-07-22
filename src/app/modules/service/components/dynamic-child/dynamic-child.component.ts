import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  InputTextComponent
} from '../../forms/input-text/input-text.component';
@Component({
  selector: 'app-dynamic-child',
  templateUrl: './dynamic-child.component.html',
  styleUrls: ['./dynamic-child.component.scss']
})
export class DynamicChildComponent implements OnInit {
  @Input()
  public componentData: any;

  @Input()
  public form: FormGroup;

  public cmpList = {
    'string': InputTextComponent,
  };
  public inputs = {};
  public components = [];

  public ngOnInit(): void {
    this.scanComponent(this.componentData);
  }


  public scanComponent(obj): any {
    for (const [key, value] of Object.entries(obj)) {
      console.log(`kv`, key, value);
      const data = { key, value };
      const cmpName = value ? value['type'] : 'string';
      this.loadComponent(cmpName, data);
    }

  }

  public loadComponent(cmpName, componentData): any {
    const cmpNameC = this.cmpList[cmpName];

    const inputsDataObj = {
      componentData: componentData,
      data: 'test',
      form: this.form
    };

    const obj = {
      'name': cmpNameC,
      'inputs': inputsDataObj,
      'outputs': {}
    };

    this.components.push(obj);
  }

}

