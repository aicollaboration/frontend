import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "solution-design",
    templateUrl: "./solution-design.component.html",
    styleUrls: [
        "./solution-design.component.scss",
    ],
})
export class SolutionDesignComponent {
    public primaryColor: string = '#2889e9';
    public secondaryColor: string = '#888';
    public designForm = new FormGroup({
        primaryColor: new FormControl(),
        secondaryColor: new FormControl(),
        companyLogo: new FormControl(),
        solutionLogo: new FormControl(),
    });

    public imageChangedEvent: any = '';
    public croppedImage: any = '';

    constructor() {
    }

    public async onSubmit() {

    }


    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        /* show cropper */
    }
    cropperReady() {
        /* cropper ready */
    }
    loadImageFailed() {
        /* show message */
    }

}