import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { AuthActionType, userLoggedInAction, userLoggedOutAction, userRegisteredAction } from '../redux/auth-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: UserModel) {
        // "http://localhost:3030/api/auth/register"
        const addedUser = await this.http.post<UserModel>(environment.registerUrl, user).toPromise();
        console.log(addedUser);
        store.dispatch(userRegisteredAction(addedUser));
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        // 'loggedInUser' = UserModel with 'username, firstname, lastname, token';
        // 'first' because I want to display in header
        // 'token' because I need to send to server to authorize my requests
        // 'password' WILL NOT BE RETURNED TO CLIENT
        const loggedInUser = await this.http.post<UserModel>(environment.loginUrl, credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        return loggedInUser;
    }

    public logout() {
        store.dispatch(userLoggedOutAction());
        store.dispatch({ type: AuthActionType.UserLoggedOut, payload: null});
    }
    
}
