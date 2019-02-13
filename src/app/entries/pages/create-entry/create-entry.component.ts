import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validations} from '../../../shared/validators/validations';
import {Observable} from 'rxjs';
import {IMood} from '../../../moods/models/mood';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {MoodCloseModal, MoodSaveRequested} from '../../../moods/actions/moods.actions';
import {isEntryLoadingSave, selectEntry} from '../../selectors/entries.selectors';
import {IEntry} from '../../models/entry';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit {


  form: FormGroup;
  validations: Validations;

  loadingSave$: Observable<boolean>;
  entry$: Observable<IEntry>;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.entry$ = this.store.pipe(select(selectEntry));
    this.loadingSave$ = this.store.pipe(select(isEntryLoadingSave));
    this.createForm();
    // this.form.patchValue(this.data);
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      mood: ['', Validators.required],
      activities: [[], Validators.required],
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
    this.store.dispatch(new MoodCloseModal());
  }

  save() {
    console.log(this.form.value);
    this.store.dispatch(new MoodSaveRequested({mood: this.form.value}));
  }

  getError(name: string) {
    const control = this.form.get(name);
    return this.validations.getControlErrors(control);
  }
}
