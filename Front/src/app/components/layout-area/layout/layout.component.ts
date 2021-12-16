import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplitterType } from 'igniteui-angular';
import { Unsubscribe } from 'redux';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

    public typeHorizontal = SplitterType.Horizontal;
    public typeVertical = SplitterType.Vertical;

  
    public user: UserModel;
    private unsubscribeMe: Unsubscribe;
    public products: string;
    public urlWide: boolean = false;
    public mainWidth = 6;
    public menuWidth: number;

      constructor(private notify: NotifyService, private router: Router) {    }
  
   async ngOnInit() {
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
  
        if (JSON.parse(localStorage.getItem('user'))) {
            this.user = store.getState().authState.user;
        }
  
        this.products = this.router.url;
        if (this.products === "products") {this.urlWide = true};
   }
      
  
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

    public isNotHome() {
        const h = this.router.url.includes("/home");
        return !h
    }

    public isNotHomeOrOrder() {
        const h = this.router.url.includes("/home");
        const o = this.router.url.includes("/order");
        if (!h && !o) {
            return true
        } else {
            return false;
        }
    }

    public isOrder() {
        const o = this.router.url.includes("/order");
        return o;
    }

    public productsPage() {
        const p = this.router.url.includes("/products");
        const c = this.router.url.includes("/categories");
        const a = this.router.url.includes("/admin");
        if (p || c || a) {
            return true
        } else {
            return false
        }
    }
  
  }
  