import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel } from '../../models/service.model';
import { OpenApiParserService } from '../../services/openapi-parser.service';

@Component({
  selector: 'service-endpoint',
  templateUrl: './service-endpoint.component.html',
  styleUrls: ['./service-endpoint.component.scss']
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

  public service: ServiceModel;

  public constructor(
    private http: HttpClient,
    private apiParser: OpenApiParserService,
    private route: ActivatedRoute,
  ) { }


  public ngOnInit(): void {
    this.route.parent.data.subscribe(async data => {
      debugger
      this.service = data.service;

      let apiDefinition = data.service.api;
      if (typeof apiDefinition === 'string') {
        apiDefinition = JSON.parse(apiDefinition);
      }

      this.api = await this.apiParser.parse(apiDefinition);
      this.request = this.api.schemas['predict'].schema;
    });
  }

  public predict(): void {
    this.loading = true;

    const values = this.form.value;

    const path = this.api.schemas[this.selectedPath].path;
    const url = `${this.selectedServer}${path}`;

    this.http.post(url, values).subscribe((response) => {
      this.response = JSON.stringify(response);
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  public loadExample(): void {

  }
}