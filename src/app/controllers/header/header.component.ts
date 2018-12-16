import { Subscription } from 'rxjs/';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';



@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"

})
export class HeaderComponent implements OnInit, OnDestroy {
    profileUrl: string;
    username:string
    private subscription: Subscription;
    constructor(private authService: AuthService, private router: Router) {


    }
    ngOnInit() {
        this.subscription = this.authService.profileurlchange.subscribe(res => {
            this.profileUrl = res
        });
        this.username=localStorage.getItem('username');
        this.authService.getProfile(this.username).subscribe(res => {
            this.profileUrl = res.profileUrl.length == 0 ? this.defaultImg() : res.profileUrl
        }, err => {

        })
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    defaultImg(): string {
        return "/assets/images/default.png"
    }
    logout() {
        this.authService.logOut().subscribe((res) => {
            this.router.navigate(['login'])
        });
    }

}