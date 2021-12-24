import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/layout/common/user/user.service';
import { User } from 'app/layout/common/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit, OnDestroy {
    @Input()
    public showAvatar: boolean;

    // Private
    private unsubscribeAll: Subject<any>;
    private _user: User;

    /**
     * Constructor
     *
     * @param {UserService} userService
     */
    constructor(
        private userService: UserService
    ) {
        // Set the private defaults
        this.unsubscribeAll = new Subject();

        // Set the defaults
        this.showAvatar = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    @Input()
    set user(value: User) {
        // Save the user
        this._user = value;

        // Store the user in the service
        this.userService.user = value;
    }

    get user(): User {
        return this._user;
    }

    public ngOnInit(): void {
        // Subscribe to user changes
        this.userService.user$
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((user: User) => {
                this._user = user;
            });
    }

    public ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    /**
     * Update the user status
     *
     * @param status
     */
    public updateUserStatus(status): void {
        // Update the user data
        this.user.status = status;

        // Update the user on the server
        this.userService.update(this.user);
    }
}
