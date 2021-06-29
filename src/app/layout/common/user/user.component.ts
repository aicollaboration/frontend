import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/layout/common/user/user.types';
import { UserService } from 'app/layout/common/user/user.service';

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
    showAvatar: boolean;

    // Private
    private unsubscribeAll: Subject<any>;
    private _user: User;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {Router} router
     * @param {UserService} userService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,
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

    public navigate(commands: any[]): void {
        this.router.navigate(commands);
    }
}
