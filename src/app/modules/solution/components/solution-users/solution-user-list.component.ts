import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../../models/user.model";

class UserDataSource extends DataSource<UserModel> {
    connect(collectionViewer: CollectionViewer): Observable<readonly UserModel[]> {
        return new Observable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
    }

}

@Component({
    selector: "solution-user-list",
    templateUrl: "./solution-user-list.component.html",
    styleUrls: [
        "./solution-user-list.component.scss",
    ],
})
export class SolutionUserListComponent implements OnInit {
    public displayedColumns = ['id'];
    public dataSource: UserDataSource | null;

    public ngOnInit(): void {
        this.loadData();
    }


    private loadData(): void {
        this.dataSource = new UserDataSource();
    }

    constructor() {
    }

}