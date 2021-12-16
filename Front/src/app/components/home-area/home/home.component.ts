import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  public user: UserModel;
  private unsubscribeMe: Unsubscribe;


  constructor(

  ) { }

  ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });

    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = store.getState().authState.user;
    }
  }

  ngOnDestroy(): void {
    // alert("Home Destroy")
    this.unsubscribeMe();
  }


}
