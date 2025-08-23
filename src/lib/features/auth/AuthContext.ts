import type IUser from "$lib/features/auth/IUser";
import { writable } from "svelte/store";

const _user = writable<IUser | null>(null);
const _token = writable<string | null>(null);

export default class AuthContext {

    private static instance: AuthContext | null = null;

    private constructor() {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

        _user.set(user);
        _token.set(token);
    }

    public static getInstance(): AuthContext {
        if (!AuthContext.instance) {
            AuthContext.instance = new AuthContext();
        }
        return AuthContext.instance;
    }

    public getUser(): IUser | null {
        let user: IUser | null = null;
        _user.subscribe(value => user = value)();
        return user;
    }

    public getToken(): string | null {
        let token: string | null = null;
        _token.subscribe(value => token = value)();
        return token;
    }

    public isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    public login(user: IUser, token: string): void {
        _user.set(user);
        _token.set(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    public logout(): void {
        _user.set(null);
        _token.set(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

}
