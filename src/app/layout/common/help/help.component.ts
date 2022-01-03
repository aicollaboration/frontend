import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "help",
    templateUrl: "./help.component.html",
    styleUrls: ["./help.component.scss"]
})
export class HelpComponent {
    constructor(
        public router: Router,
    ) { }

    public toggleHelpContainer(): void {
        const helpContainer: HTMLElement = document.getElementById("help-container");
        helpContainer.classList.toggle("hidden");
    }
}