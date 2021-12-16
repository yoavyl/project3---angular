import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import UserModel from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    // Get all users: 
    public async getAllidcardsEmails() {
        // i don't use redux here coz i don't want to save them for security reasons
        // this is why in the backend i select only the relevant columns
        const users = await this.http.get<UserModel[]>(environment.usersUrl).toPromise();           
        return users;
    }

        // Get all users: 
        public async checkId(idCard: string) {
          // i don't use redux here coz i don't want to save them for security reasons
          // this is why in the backend i select only the relevant columns
          const users = await this.http.get<UserModel[]>(environment.usersUrl + "id/" + idCard).toPromise();           
          return users;
      }
}