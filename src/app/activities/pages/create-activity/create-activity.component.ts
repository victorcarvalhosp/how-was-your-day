import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Observable} from 'rxjs';
import {IActivity} from '../../models/activity';
import {isActivitiesLoading, selectActivity} from '../../selectors/activities.selectors';
import {ActivityCloseModal, ActivityOpenModal} from '../../actions/activities.actions';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validations} from '../../../shared/validators/validations';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {


  form: FormGroup;
  validations: Validations;

  activity$: Observable<IActivity>;
  constructor(private store: Store<AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.activity$ = this.store.pipe(select(selectActivity));
    this.createForm();
    // this.form.patchValue(this.data);
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      icon: ['', Validators.required],
    });
    this.createValidationMessages();
  }

  private createValidationMessages() {
    this.validations = new Validations(
        {
          'name': {
            'required': 'Name is required.',
          },
          'icon': {
            'required': 'Icon is required.',
          }
        }
    );
  }

  closeModal() {
    this.store.dispatch(new ActivityCloseModal());
  }

  getError(name: string) {
    const control = this.form.get(name);
    return this.validations.getControlErrors(control);
  }

}