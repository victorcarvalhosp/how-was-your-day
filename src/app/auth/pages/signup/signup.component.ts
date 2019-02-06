import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validations} from '../../../shared/validators/validations';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {isLoginLoading, loginErrorMessage} from '../../selectors/auth.selectors';
import {AppState} from '../../../reducers';
import {IAuthentication} from '../../models/authentication';
import {Login, Signup} from '../../actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  validations: Validations;

  loading$: Observable<boolean>;
  errorMessage$ = this.store.pipe(select(loginErrorMessage));

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
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

  ngOnInit() {
    this.loading$ = this.store.pipe(select(isLoginLoading));
    this.form = this.fb.group({
      identifier: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.createValidationMessages();
  }

  onSubmit() {
    const auth: IAuthentication = {...this.form.value};
    this.store.dispatch(new Signup(auth));
  }

  getError(name: string) {
    const control = this.form.get(name);
    return this.validations.getControlErrors(control);
  }

}
