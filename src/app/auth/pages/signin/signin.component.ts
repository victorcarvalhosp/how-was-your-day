import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../../reducers';
import {tap} from 'rxjs/operators';
import {noop, pipe} from 'rxjs';
import {AuthActions, Login, LoginSuccess} from '../../actions/auth.actions';
import {IAuthentication} from '../../models/authentication';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    form: FormGroup;

    // The risky obserable object might be used to show some msg in template
    // risky$ = this.store.pipe(select(fromTeam.getAuthRisk));


    constructor(private store: Store<State>,
                private fb: FormBuilder,
                private auth: AuthService,
                private router: Router) {

        this.form = fb.group({
            identifier: ['test@angular-university.io', [Validators.required]],
            password: ['test', [Validators.required]]
        });

    }

    ngOnInit() {

    }

    onSubmit() {
        const auth: IAuthentication = {...this.form.value};
        this.store.dispatch(new Login(auth));
    }

}
