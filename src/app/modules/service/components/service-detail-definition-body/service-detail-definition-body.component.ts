import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "service-detail-definition-body",
  templateUrl: "./service-detail-definition-body.component.html",
  styleUrls: ["./service-detail-definition-body.component.scss"],
})
export class ServiceDetailDefinitionBodyComponent
  implements OnInit, AfterViewInit {
  @Input()
  public formGroup: FormGroup;
  @Input()
  public label;
  @Input()
  public mediaType;

  public typeOfForm;

  body: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  // @input form;

  public ngOnInit(): void {
    this.formGroup.addControl("body", this.formBuilder.group({
      type: "",
      name: "",
      body: "",
    }));
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      this.typeOfForm = value.type;
    });
  }

}
