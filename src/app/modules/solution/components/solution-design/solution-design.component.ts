import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { SolutionService } from "../../services/solution.service";

@Component({
    selector: "solution-design",
    templateUrl: "./solution-design.component.html",
    styleUrls: [
        "./solution-design.component.scss",
    ],
})
export class SolutionDesignComponent implements OnInit {
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

    public solutionId: string = '';

    public constructor(
        private route: ActivatedRoute,
        private solutionService: SolutionService
    ) {
        this.designForm.patchValue({
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor,
        });
    }

    public ngOnInit(): void {
        this.route.parent.params.subscribe(async (params) => {
            this.solutionId = params.solutionId;

            const solution = await this.solutionService.getSolution(params.solutionId);

            this.primaryColor = solution.primaryColor;
            this.secondaryColor = solution.secondaryColor;
            this.solutionLogo = solution.logo;
        }, (error) => {
            console.error(error);
        });
    }

    public async onSubmit() {
        this.solutionService.updateSolution({
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor,
            logo: this.solutionLogo,
        }, this.solutionId);
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