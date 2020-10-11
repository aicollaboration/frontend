import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'product-creation',
    templateUrl: './product-creation.component.html',
    styleUrls: [
        './product-creation.component.scss',
    ],
})
export class ProductCreationComponent implements OnInit {
    public productForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<ProductCreationComponent>,
        private formBuilder: FormBuilder
    ) { }

    public ngOnInit(): void {
        this.productForm = this.formBuilder.group({

        });
    }

    public saveAndClose(): void {
        this.matDialogRef.close();
    }
}
