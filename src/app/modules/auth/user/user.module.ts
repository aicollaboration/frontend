import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { userRoutes } from "./user-routes.module";

@NgModule({
    declarations: [
        UserProfileComponent,
    ],
    imports: [
        RouterModule.forChild(userRoutes),
    ],
    exports: []
})
export class UserModule { }
