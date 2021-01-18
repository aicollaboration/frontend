import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'project-selector',
    templateUrl: './project-selector.component.html',
    styleUrls: [
        './project-selector.component.scss',
    ],
    encapsulation: ViewEncapsulation.None
})
export class ProjectSelectorComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {

    }

    saveAndClose(): void {
        // Save the message as a draft
        // this.saveAsDraft();

        // Close the dialog
        // this.matDialogRef.close();
    }
}