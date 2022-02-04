import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "service-detail-definition-headers",
  templateUrl: "./service-detail-definition-headers.component.html",
  styleUrls: ["./service-detail-definition-headers.component.scss"],
})
export class ServiceDetailDefinitionHedaersComponent implements OnInit, AfterViewInit {
  @Input()
  public dataType;

  @Input()
  public formGroup: FormGroup;

  public typeOfForm;

  public items: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.formGroup.addControl(
      "headers",
      this.formBuilder.array([this.createItem()])
    );

    console.log(this.formGroup, "form");

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
    const form = this.formGroup.get("headers") as FormArray;
    form.removeAt(index);
  }

  addItem(): void {
    this.items = this.formGroup.get("headers") as FormArray;
    this.items.push(this.createItem());
  }
}
