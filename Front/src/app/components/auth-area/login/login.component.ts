import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import UserModel from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();

    @Input()
    public user: UserModel;
    

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    public async login() {
        try {
            const user = await this.myAuthService.login(this.credentials);
            console.log("here")
            console.log(this.credentials);
            if (user.isAdmin) {
                // this.notify.success("Hello admin!");
                this.myRouter.navigateByUrl("/admin");
            } else {
                // this.notify.success("You are logged-in :-)");
                this.myRouter.navigateByUrl("/home");
            }
        }
        catch(err) {
            this.notify.error(err);
        }
    }

    reg() {
        this.myRouter.navigateByUrl("/register");
    }
}
