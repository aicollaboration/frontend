import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceModel } from '../../models/service.model';
import { ApiParserService } from '../../services/api-parser.service';

@Component({
  selector: 'service-endpoint',
  templateUrl: './service-endpoint.component.html',
  styleUrls: ['./service-endpoint.component.scss'],
})
export class ServiceEndpointComponent implements OnInit {
  public response = '';
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
    private apiParserService: ApiParserService,
    private http: HttpClient
  ) {}


  public dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) { return acc; }
        if (typeof val === 'object') { return this.dig(val, target); }
      }, undefined)


      
  // tslint:disable-next-line:typedef
  public async ngOnInit() {

    this.api = JSON.parse(this.service.api);
    const _api = JSON.parse(this.service.api);
    let refInput;

    console.log(_api, 'api');

    // tslint:disable-next-line:no-shadowed-variable
    const options = _api.servers.map(( server ) => {
      const a = {};
      a['key'] = Object.keys(server)[0];
      a['viewValue'] = Object.values(server)[0];
      a['value'] = Object.values(server)[0];
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

    const _requestBodyObj = await this.dig( _api, 'requestBody') ;
    const _responseBodyObj = await this.dig( _api, 'responses') ;

    // api.paths['/models/2/inference'].post.requestBody;
    // api.paths['/models/2/inference'].post.responses;

    this.inputProperties = await this.dig( _requestBodyObj, '$ref');
    this.outputProperties  = await this.dig( _responseBodyObj, '$ref');

    console.log( this.inputProperties, 'api parse', this.outputProperties );

    // console.log('api.paths',api.paths['/models/2/inference'].post.requestBody.content['application/json'].schema['$ref']);
    // this.inputProperties = api.paths['/models/2/inference'].post.requestBody.content[
    //   'application/json'
    // ].schema['$ref'];

  // this.outputProperties = api.paths['/models/2/inference'].post.responses['200'].content[
  //     'application/json'
  //   ].schema['$ref'];
    
    if (!!this.inputProperties) {
      refInput = this.inputProperties.split('/');
    }

    // this.apiParserService.parse(api);

    if (refInput.length > 1) {
      const lastEleemnt = refInput[refInput.length - 1];
      const Objproperties = await this.dig ( _api, lastEleemnt );
      this.responseApi = Objproperties.properties;
      // console.log(Objproperties, 'api', lastEleemnt);
      // api[refInput[1]][refInput[2]][refInput[3]].properties;
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

    if (!!this.outputProperties) {
      refOutput = this.outputProperties.split('/');
      const Objproperties = await this.dig ( this.api , refOutput[refOutput.length - 1]);
      this.responseApi = Objproperties.properties;
    } else{
      this.responseApi = await this.dig ( this.api , 'Output');
    }
  
    console.log(this.responseApi, 'api response');
    // else { this.responseApi = Objproperties.properties;}
  
    const _inputs = { ...values };
    _inputs.text = _inputs.context ? _inputs.context : '';
    _inputs.questions = _inputs.question ? _inputs.question : '';
    
    delete _inputs.path;
    delete _inputs.question;
    delete _inputs.context;
    delete _inputs.url;

    console.log(_inputs, 'api');

    this.path = values.path;
    const url = values.url + this.path;

    console.log(_inputs, 'Values');
    const body = {
      input: [
        {..._inputs}
      ],
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
          this.response = uploadEvent.body['predictions'][0]['answers'];
          // uploadEvent.body['predictions'][0]['answers'][0]['answer'];
          this.loading = false;
          break;
      }
    });
  }
}
function server(server: any): any[] {
  throw new Error('Function not implemented.');
}
