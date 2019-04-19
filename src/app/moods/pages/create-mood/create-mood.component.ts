import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Observable} from 'rxjs';
import {IMood} from '../../models/mood';
import {isMoodsLoading, isMoodLoadingSave, selectMood} from '../../selectors/moods.selectors';
import {MoodCloseModal, MoodOpenAlertRemove, MoodOpenModal, MoodRemoveRequested, MoodSaveRequested} from '../../actions/moods.actions';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validations} from '../../../shared/validators/validations';
import {MoodIconEnum} from '../../enums/mood-icon';

@Component({
    selector: 'app-create-mood',
    templateUrl: './create-mood.component.html',
    styleUrls: ['./create-mood.component.scss']
})
export class CreateMoodComponent implements OnInit {


    form: FormGroup;
    validations: Validations;

    loadingSave$: Observable<boolean>;
    mood$: Observable<IMood>;
    icons: MoodIconEnum[];

    constructor(private store: Store<AppState>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.mood$ = this.store.pipe(select(selectMood));
        this.loadingSave$ = this.store.pipe(select(isMoodLoadingSave));
        this.icons = MoodIconEnum.values();
        this.createForm();
        // this.form.patchValue(this.data);
    }

    createForm() {
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.compose([Validators.required])],
            icon: ['', Validators.required],
            color: ['', Validators.required],
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

    presentRemoveAlertConfirm(mood: IMood) {
        this.store.dispatch(new MoodOpenAlertRemove({mood: mood}));
    }

}
