import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import store from '../redux/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        // If we have a 'token' for the user in the AuthStore in Redux?
        if(store.getState().authState.user) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + store.getState().authState.user.token
                }
            });
        }

        return next.handle(request);
    }
}
