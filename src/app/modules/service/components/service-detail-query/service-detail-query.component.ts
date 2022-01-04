import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ServiceModel } from "../../models/service.model";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "service-detail-query",
  templateUrl: "./service-detail-query.component.html",
  styleUrls: ["./service-detail-query.component.scss"],
})
export class ServiceDetailQueryComponent implements OnInit, AfterViewInit {
  @Input()
  public formName: FormGroup;
  @Input()
  public label;
  @Input()
  public dataType;
  
  public typeOfForm;

  query: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  // @input form;

  public ngOnInit(): void {
    this.formName.addControl(
      "query",
      this.formBuilder.array([this.createItem()])
    );

    console.log(this.formName, "form");
    // this.formName.group({
    //   query: this.formBuilder.array([this.createItem()]),
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
    const form = this.formName.get("query") as FormArray;
    form.removeAt(index);
  }

  addItem(): void {
    this.query = this.formName.get("query") as FormArray;
    this.query.push(this.createItem());
  }
}
