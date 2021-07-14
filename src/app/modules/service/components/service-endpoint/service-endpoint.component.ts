import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ServiceModel } from "../../models/service.model";

@Component({
  selector: "service-endpoint",
  templateUrl: "./service-endpoint.component.html",
  styleUrls: ["./service-endpoint.component.scss"],
})
export class ServiceEndpointComponent implements OnInit {
  public response = "";
  public loading = false;
  public responseApiTest;
  public serverList = {};
  public path;

  public form = new FormGroup({
    // server: new FormControl(),
    // context: new FormControl(),
  });

  @Input()
  public service: ServiceModel;
  public constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    const api = JSON.parse(this.service.api);

    console.log(api.components.schemas.Input.properties, "test");
    this.responseApiTest = api.components.schemas.Input.properties;

    // tslint:disable-next-line:no-shadowed-variable
    const options = api.servers.map((server) => {
      const a = {};
      a["key"] = Object.keys(server)[0];
      a["viewValue"] = Object.values(server)[0];
      a["value"] = Object.values(server)[0];
      return a;
    });

    this.serverList["key"] = "url";
    this.serverList["options"] = options;

    this.path = Object.keys(api.paths)[0];
  }

  public predict(): void {
    this.loading = true;

    const values = this.form.value;
    this.http.post(`http://localhost:5000/api/1.0/predict`, values).subscribe(
      (response) => {
        this.response = JSON.stringify(response);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public ask(): void {
    this.loading = true;

    const values = this.form.value;

    const url = values.url + this.path;

    console.log(values, "url", url);
    // const url = `https://demos.deepset.ai/models/2/inference`;
    const body = {
      input: [
        {
          questions: values.question,
          text: values.context,
        },
      ],
      language: 'english',
      model: {
        id: 2,
        language: 'english',
        name: 'bert-english-qa-large',
        prediction_type: 'span_classification',
      },
    };
    const observable = this.http.post(url, body, { observe: 'events' });
    observable.subscribe((uploadEvent) => {
      switch (uploadEvent.type) {
        case HttpEventType.Sent:
          console.log('uploadEvent#sent ', uploadEvent);
          break;
        case HttpEventType.UploadProgress:
          console.log(
            'uploadEvent#uploadProgress: ',
            uploadEvent.loaded,
            uploadEvent.total
          );
          break;
        case HttpEventType.User:
          console.log('uploadEvent#user ', uploadEvent);
          break;
        case HttpEventType.ResponseHeader:
          console.log('uploadEvent#responseHeader ', uploadEvent);
          break;
        case HttpEventType.DownloadProgress:
          console.log('uploadEvent#download ', uploadEvent);
          break;
        case HttpEventType.Response:
          console.log('uploadEvent#response ', uploadEvent);
          this.response =
            uploadEvent.body['predictions'][0]['answers'][0]['answer'];
          this.loading = false;
          break;
      }
    });
  }
}
function server(server: any): any[] {
  throw new Error("Function not implemented.");
}
