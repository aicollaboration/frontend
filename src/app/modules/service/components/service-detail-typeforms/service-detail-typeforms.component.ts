import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ServiceModel } from "../../models/service.model";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "service-detail-typeforms",
  templateUrl: "./service-detail-typeforms.component.html",
  styleUrls: ["./service-detail-typeforms.component.scss"],
})
export class ServiceDetailTypeformsComponent implements OnInit, AfterViewInit {
  @Input()
  public formName: FormGroup;
  @Input()
  public dataType;
  
  public typeOfForm;

  items: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  // @input form;

  public ngOnInit(): void {
    this.formName.addControl(
      "items",
      this.formBuilder.array([this.createItem()])
    );

    console.log(this.formName, "form");
    // this.formName.group({
    //   items: this.formBuilder.array([this.createItem()]),
    // });
  }

  ngAfterViewInit(): void {
    // console.log(this.cmdId, ' doc_requiredFields in ouside  form subscribe');
    this.formName.valueChanges.subscribe((value) => {
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
    const form = this.formName.get("items") as FormArray;
    form.removeAt(index);
  }

  addItem(): void {
    this.items = this.formName.get("items") as FormArray;
    this.items.push(this.createItem());
  }
}
