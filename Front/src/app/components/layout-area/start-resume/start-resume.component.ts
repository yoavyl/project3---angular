import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartItemModel from 'src/app/models/item.model';

@Component({
  selector: 'app-start-resume',
  templateUrl: './start-resume.component.html',
  styleUrls: ['./start-resume.component.css']
})

export class StartResumeComponent  {

  // public isAdmin: boolean;
  // private unsubscribeMe: Unsubscribe;

  @Input()
  public carts: CartItemModel[];

  @Input()
  public openCart: boolean;

  constructor( private router: Router) {}

  public isNotHome() {
    const h = this.router.url.includes("/home");
    return !h
  }

}

