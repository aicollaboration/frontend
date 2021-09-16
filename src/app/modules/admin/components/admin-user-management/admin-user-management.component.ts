import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'admin-user-management',
    templateUrl: './admin-user-management.component.html',
    styleUrls: ['./admin-user-management.component.scss'],
})
export class AdminUserManagementComponent {
    public users: MatTableDataSource<any>;
    public userColumns: string[];

    public trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}