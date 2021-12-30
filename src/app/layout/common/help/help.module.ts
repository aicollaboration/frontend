import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { HelpComponent } from "./help.component";

@NgModule({
    declarations: [
        HelpComponent,
    ],
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        RouterModule,
    ],
    exports: [
        HelpComponent,
    ]
})
export class HelpModule { }