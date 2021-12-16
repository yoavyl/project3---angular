import { UserModel } from "../models/user.model";

// Auth State: 
export class AuthState {
    public user: UserModel = null;
    public constructor() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.user = user;
        }
        // console.log("admin? " + this.user.admin)
    }
}

// Auth Action Types: 
export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// Auth Action Creators: 
export function userRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}

// Auth Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.UserRegistered:
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;

            // ----------------------------------------
            // DEMO - FOR TESTING ONLY! DON'T DO IT AT ANY OTHER PROJECT OR PRODUCTION:


            // Or maybe just get that from the sql? change the name of field to isAdmin?

            // if(newState.user.admin == true) {
            //     newState.user.isAdmin = true;
            // }
            // ----------------------------------------

            localStorage.setItem("user", JSON.stringify(newState.user));

            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null;
            localStorage.removeItem("user");
            break;
    }

    return newState;
}