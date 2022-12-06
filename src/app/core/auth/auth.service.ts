import { Injectable } from '@angular/core';
import { User } from '@supabase/gotrue-js';
import { AuthChangeEvent, createClient, SupabaseClient, Session } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
    private supabase: SupabaseClient;
    private authenticated: boolean = false;

    constructor() {
        this.supabase = this.getClient();
        this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session) => {
            if (event === 'SIGNED_IN') {
                this.authenticated = true;
                this.supabase.auth.setAuth(session.access_token);
            } else if (event === 'SIGNED_OUT') {
                this.authenticated = false;
            }
        })
    }

    public onAuthStateChange(): Promise<User> {

        return new Promise((resolve, reject) => {
            this.supabase.auth.onAuthStateChange(event => {
                if (event === 'SIGNED_IN') {
                    const user = this.supabase.auth.user();
                    resolve(user);
                } else if (event === 'SIGNED_OUT') {
                    reject();
                }
            })
        });
    }

    public getClient() {
        /*
        return createClient(
            'http://localhost:54321',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.M2d2z4SFn5C7HlJlaSLfrzuYim9nbY_XI40uWFN3hEE'
        );
        */
        return createClient(
            'https://exrcpfgiopxnpdbziykr.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE'
        );
    }

    public async signIn(email: string, password: string): Promise<User> {
        if (this.isAuthenticated) {
            throw new Error('User is already logged in.');
        }

        const redirectTo = `//${window.location.host}/admin/dashboard`;
        const { user, error, session } = await this.supabase.auth.signIn({ email, password }, { redirectTo });

        if (error) {
            throw error;
        }

        return user;
    }

    public async signUp({ email, password }): Promise<User> {
        const { user, error } = await this.supabase.auth.signUp({ email, password });
        if (error) {
            throw error;
        }

        return user;
    }

    public async signUpWithGithub(): Promise<User> {
        const redirectTo = `${window.location.protocol}//${window.location.host}/dashboard`;
        const { user, error } = await this.supabase.auth.signIn({ provider: 'github' }, { redirectTo });
        if (error) {
            throw error;
        }

        return user;
    }

    public async signOut(): Promise<boolean> {
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            throw error;
        }

        return true;
    }

    public async updateUser(data: any) {
        const { user, error } = await this.supabase.auth.update({ data });
        if (error) {
            throw error;
        }

        return user;
    }

    public async check(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.supabase.auth.onAuthStateChange(event => {
                if (event === 'SIGNED_IN') {
                    resolve();
                } else if (event === 'SIGNED_OUT') {
                    reject();
                }
            })
        });
    }

    get isAuthenticated(): boolean {
        return this.authenticated;
    }

    set isAuthenticated(isAuthenticated: boolean) {
        this.authenticated = isAuthenticated;
    }


    get user() {
        const user = this.supabase.auth.user();
        return user;
    }

    public async getSession(): Promise<{ data: Session, user: User, error: Error }> {
        const currentSession = this.supabase.auth.session();

        const session = await this.supabase.auth.refreshSession();
        return session;
    }
}
