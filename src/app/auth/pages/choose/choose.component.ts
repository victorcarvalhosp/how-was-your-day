import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTE_AUTH_SIGNIN, ROUTE_AUTH_SIGNUP, ROUTE_TAB1} from '../../../shared/router/routes.constants';

@Component({
    selector: 'app-choose',
    templateUrl: './choose.component.html',
    styleUrls: ['./choose.component.scss']
})
export class ChooseComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToSignin() {
        this.router.navigate([ROUTE_AUTH_SIGNIN]);
    }

    goToSignup() {
        this.router.navigate([ROUTE_AUTH_SIGNUP]);
    }

    goToHome() {
        this.router.navigate([ROUTE_TAB1]);
    }

}
