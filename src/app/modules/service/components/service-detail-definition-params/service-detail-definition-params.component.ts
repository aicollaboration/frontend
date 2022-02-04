import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "service-detail-definition-params",
  templateUrl: "./service-detail-definition-params.component.html",
  styleUrls: ["./service-detail-definition-params.component.scss"],
})
export class ServiceDetailDefinitionParamsComponent implements OnInit, AfterViewInit {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public label: string;

  @Input()
  public dataType: any;

  public typeOfForm: string;
  public params: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  // @input form;

  public ngOnInit(): void {
    this.formGroup.addControl(
      "params",
      this.formBuilder.array([this.createItem()])
    );
  }

  ngAfterViewInit(): void {
    // console.log(this.cmdId, ' doc_requiredFields in ouside  form subscribe');
    this.formGroup.valueChanges.subscribe((value) => {
      this.typeOfForm = value.type;

      console.log("name has changed:", this.typeOfForm);

      // post
      // ng
      // get
      // delete
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: "",
      type: "",
      examplevalue: "",
    });
  }

  removeGroup(index: number): void {
    // index of zero should not allow to delete
    console.log(index);
    const form = this.formGroup.get("params") as FormArray;
    form.removeAt(index);
  }

  addItem(): void {
    this.params = this.formGroup.get("params") as FormArray;
    this.params.push(this.createItem());
  }
}
