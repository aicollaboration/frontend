import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TreoCardModule } from '@treo/components/card';
import { routes } from 'app/modules/admin/admin-routing.module';
import { UseCaseListComponent } from 'app/modules/admin/components/use-case-list/use-case-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';

@NgModule({
    declarations: [
        UseCaseListComponent,
        AdminOverviewComponent,
        ProjectSelectorComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        MatIconModule,
        MatDividerModule,
        MatMenuModule,
        TreoCardModule,
        MatDialogModule,
    ]
})
export class AdminModule {
}
