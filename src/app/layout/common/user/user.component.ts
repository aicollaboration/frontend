import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    public user: User;

    constructor(private authService: AuthService) {
    }

    public async ngOnInit(): Promise<void> {
        const session = await this.authService.getSession();

        if (session && 'user' in session) {
            this.user = session.user;
        }
    }
}
