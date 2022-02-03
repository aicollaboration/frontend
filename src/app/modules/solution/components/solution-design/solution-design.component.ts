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

    public companyLogo: any = '';
    public companyLogoChangeEvent: any = '';
    public solutionLogo: any = '';
    public solutionLogoChangeEvent: any = '';

    public async onSubmit() {
        
    }

    public onCompanyLogoCropped(event: any) {
        this.companyLogo = event.base64;
    }

    public onSolutionLogoCropped(event: any) {
        this.solutionLogo = event.base64;
    }

    public onCompanyLogoChange(event: any) {
        this.companyLogoChangeEvent = event;
    }

    public onSolutionLogoChange(event: any) {
        this.solutionLogoChangeEvent = event;
    }
}