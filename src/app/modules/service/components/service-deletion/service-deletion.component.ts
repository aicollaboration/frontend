import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'service-deletion',
    templateUrl: './service-deletion.component.html',
    styleUrls: [
        './service-deletion.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ServiceDeletionComponent implements OnInit {
    constructor(public matDialogRef: MatDialogRef<ServiceDeletionComponent>) { }

    public ngOnInit(): void {
        debugger
    }

    public saveAndClose(): void {
    }
}