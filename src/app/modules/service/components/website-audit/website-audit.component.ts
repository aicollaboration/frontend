import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'website-audit',
    templateUrl: './website-audit.component.html',
    styleUrls: [
        './website-audit.component.scss'
    ]
})
export class WebsiteAuditComponent {
    public form = new FormGroup({
        entryPoint: new FormControl(),
        force: new FormControl(),
        makeScreenshot: new FormControl(),
        makeCoverage: new FormControl(),
        trackPerformance: new FormControl(),
        trackEvents: new FormControl(),
        makeAccessibilitySnapshot: new FormControl(),
        enableMetrics: new FormControl(),
        removeElements: new FormControl(),
        include: new FormControl(),
        exclude: new FormControl(),
    });
    public loading = false;

    public audit(): void {

    }
}
