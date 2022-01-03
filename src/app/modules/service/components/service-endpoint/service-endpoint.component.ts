import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceModel } from '../../models/service.model';
import { OpenApiParserService } from '../../services/openapi-parser.service';

@Component({
  selector: 'service-endpoint',
  templateUrl: './service-endpoint.component.html',
  styleUrls: ['./service-endpoint.component.scss'],
})
export class ServiceEndpointComponent implements OnInit {
  public request: string;
  public response: string;
  public loading = false;
  public api;

  public form = new FormGroup({});
  public configForm = new FormGroup({});
  public selectedServer: string;
  public selectedPath: string;

  @Input()
  public service: ServiceModel;

  public constructor(
    private http: HttpClient,
    private apiParser: OpenApiParserService,
  ) { }


  public async ngOnInit(): Promise<void> {
    if (this.service.api) {
      this.api = await this.apiParser.parse(JSON.parse(this.service.api));

      this.configForm = new FormGroup({
        server: new FormControl(this.api.servers[0].url),
        path: new FormControl(Object.keys(this.api.schemas)[0]),
      });

      this.request = this.api.schemas[this.configForm.value.path].schema;
    }
  }

  public predict(): void {
    this.loading = true;

    const values = this.form.value;

    const path = this.api.schemas[this.selectedPath].path;
    const url = `${this.selectedServer}${path}`;

    this.http.post(url, values).subscribe(
      (response) => {
        this.response = JSON.stringify(response);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public loadExample(): void {
    
  }
}