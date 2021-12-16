import { Component } from '@angular/core';
import { Router } from '@angular/router';
import CityModel from 'src/app/models/city.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/users.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public user = new UserModel();
    public step: boolean = false;
    public idExists: boolean = false;
    public emailExists: boolean = false;
    public users: UserModel[];
    private idMatch: number;
    private emailMatch: number;
    public cities: CityModel[];
    id: UserModel[];

    constructor(
        private myAuthService: AuthService,
        private myUserService: UserService,
        private myCityService: CityService,
        private notify: NotifyService,
        private myRouter: Router) { }

    async ngOnInit() {
        try {
            this.users = await this.myUserService.getAllidcardsEmails();
        } catch (err) {
            // this.notify.error(err);
        }

        try {
            this.cities = await this.myCityService.getAllCities();
        } catch (err) {
            // this.notify.error(err);
        }        
    }

    public async register() {
        try {
            await this.myAuthService.register(this.user);
            // this.notify.success("You are registered :-)");
            this.myRouter.navigateByUrl("/home");
        }
        catch(err) {
            // this.notify.error(err);
        }
    }

    public checkEmail() {
        this.emailExists = false;
        this.emailMatch = this.users.findIndex(item => item.email === this.user.email);
        if (this.emailMatch>=0) { 
            this.emailExists = true;
            return true;
         } else {
             return false;
         }

    }

    public checkId() {
        this.idExists = false;
        this.idMatch = this.users.findIndex(item => item.idcard === this.user.idcard);
        if (this.idMatch>=0) { 
            this.idExists = true; 
            return true;
        } else {
            return false;
        }
    }

    public continue() {
        if (this.idMatch<0 && this.emailMatch<0) { 
            this.step = true; 
        } else {
            this.step = false;
        }
    }
    
    back() {
        this.step = false;
    }
}
