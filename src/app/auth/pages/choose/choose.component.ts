import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
        this.router.navigate(['auth/signin']);
    }

    goToSignup() {
        this.router.navigate(['auth/signup']);
    }

}
