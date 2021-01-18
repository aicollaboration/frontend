import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { routes } from './admin-routing.module';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';

@NgModule({
    declarations: [
        AdminOverviewComponent,
        ProjectSelectorComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        SharedModule,
        MatDividerModule,
        MatMenuModule,
        MatDialogModule,
    ],
})
export class AdminModule {
}
