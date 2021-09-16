import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceModel } from '../../models/service.model';
import { dig } from '../../services/utils';

@Component({
  selector: 'service-endpoint',
  templateUrl: './service-endpoint.component.html',
  styleUrls: ['./service-endpoint.component.scss'],
})
export class ServiceEndpointComponent implements OnInit {
  public response ;
  public loading = false;
  public responseApi: string;
  public serverList = {};
  public pathList = {};
  public path: string;
  public outputProperties;
  public inputProperties;
  public api;


  public form = new FormGroup({});

  @Input()
  public service: ServiceModel;
  public constructor(
    private http: HttpClient
  ) {}

      
  public async ngOnInit(): Promise<void>  {

    this.api = JSON.parse(this.service.api);
    const _api = JSON.parse(this.service.api);
    let refInput;

    const options = _api.servers.map((_server ) => {
      const a = {};
      a['key'] = Object.keys(_server)[0];
      a['viewValue'] = Object.values(_server)[0];
      a['value'] = Object.values(_server)[0];
      return a;
    });
    this.serverList['key'] = 'url';
    this.serverList['label'] = 'server';
    this.serverList['options'] = options;

    const pathOptions = Object.keys(_api.paths).map((_path) => {
      const a = {};
      a['key'] = _path;
      a['viewValue'] = _path;
      a['value'] = _path;
      return a;
    });

    this.pathList['key'] = 'path';
    this.pathList['label'] = 'path';
    this.pathList['options'] = pathOptions;

    const _requestBodyObj = await dig( _api, 'requestBody') ;
    // const _responseBodyObj = await dig( _api, 'responses') ;

   
    this.inputProperties = await dig( _requestBodyObj, '$ref');
    
    if (!!this.inputProperties) {
      refInput = this.inputProperties.split('/');
    }

    if (refInput.length > 1) {
      const lastEleemnt = refInput[refInput.length - 1];
      const Objproperties = await dig ( _api, lastEleemnt );
      this.responseApi = Objproperties.properties;
    } else {
      this.responseApi = _api.components.schemas.Input.properties;
    }
    
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

  // tslint:disable-next-line:typedef
  public async ask() {
    this.loading = true;
    let refOutput;
    const values = this.form.value;

    if (!!this.inputProperties) {
      refOutput = this.inputProperties.split('/');
      const Objproperties = await dig ( this.api , refOutput[refOutput.length - 1]);
      this.responseApi = Objproperties.properties;
    } else{
      this.responseApi = await dig ( this.api , 'Output');
    }
  
    console.log(this.responseApi, 'api response');
  
    const _inputs = { ...values };

    delete _inputs.path;
    delete _inputs.url;


    this.path = values.path;
    const url = values.url + this.path;

    const body = {
        ..._inputs
    };

    const observable = this.http.post(url, body, { observe: 'events' });
    observable.subscribe((uploadEvent) => {
      switch (uploadEvent.type) {
        case HttpEventType.Sent:
          this.loading = false;
          console.log('uploadEvent#sent ', uploadEvent);
          break;
        case HttpEventType.UploadProgress:
          this.loading = false;
          console.log(
            'uploadEvent#uploadProgress: ',
            uploadEvent.loaded,
            uploadEvent.total
          );
          break;
        case HttpEventType.User:
          this.loading = false;
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

          this.response = uploadEvent.body;
          // uploadEvent.body['predictions'][0]['answers'][0]['answer'];
          this.loading = false;
          break;
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }
}

