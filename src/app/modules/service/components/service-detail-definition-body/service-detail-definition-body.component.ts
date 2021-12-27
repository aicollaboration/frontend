import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ServiceModel } from "../../models/service.model";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "service-detail-definition-body",
  templateUrl: "./service-detail-definition-body.component.html",
  styleUrls: ["./service-detail-definition-body.component.scss"],
})
export class ServiceDetailDefinitionBodyComponent
  implements OnInit, AfterViewInit
{
  @Input()
  public formName: FormGroup;
  @Input()
  public label;
  @Input()
  public mediaType;

  public typeOfForm;

  body: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  // @input form;

  public ngOnInit(): void {
    this.formName.addControl("body", this.formBuilder.group({
      type: "",
      payloadName: "",
      payloadDesc: "",
      payloadBody: "",
    }));
  }

  ngAfterViewInit(): void {
    this.formName.valueChanges.subscribe((value) => {
      this.typeOfForm = value.type;
    });
  }

}
