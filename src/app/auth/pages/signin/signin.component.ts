import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Observable} from 'rxjs';
import {Login} from '../../actions/auth.actions';
import {IAuthentication} from '../../models/authentication';
import {loginErrorMessage, isLoginLoading} from '../../selectors/auth.selectors';
import {Validations} from '../../../shared/validators/validations';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    form: FormGroup;
    validations: Validations;

    loading$: Observable<boolean>;
    errorMessage$ = this.store.pipe(select(loginErrorMessage));

    constructor(private store: Store<AppState>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.loading$ = this.store.pipe(select(isLoginLoading));
        this.form = this.fb.group({
            identifier: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.createValidationMessages();
    }

    private createValidationMessages() {
        this.validations = new Validations(
            {
                'identifier': {
                    'required': 'E-mail is required.',
                    'email': 'Please enter a valid email address.',
                },
                'password': {
                    'required': 'Password is required.',
                    'minlength': 'Please enter at least 6 characters.',
                }
            }
        );
    }

    onSubmit() {
        const auth: IAuthentication = {...this.form.value};
        this.store.dispatch(new Login(auth));
    }

    getError(name: string) {
        const control = this.form.get(name);
        return this.validations.getControlErrors(control);
    }

}
