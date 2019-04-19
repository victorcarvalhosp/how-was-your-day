import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Validations} from '../../../shared/validators/validations';
import {Observable} from 'rxjs';
import {IMood} from '../../../moods/models/mood';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {MoodCloseModal, MoodSaveRequested, MoodsRequestedWithCache} from '../../../moods/actions/moods.actions';
import {isEntryLoadingSave, selectEntry} from '../../selectors/entries.selectors';
import {IEntry} from '../../models/entry';
import {selectAllMoods} from '../../../moods/selectors/moods.selectors';
import {IActivity} from '../../../activities/models/activity';
import {ActivitiesRequestedWithCache} from '../../../activities/actions/activities.actions';
import {selectAllActivities} from '../../../activities/selectors/activities.selectors';
import {EntrySaveRequested} from '../../actions/entries.actions';
import {map, switchMap, take} from 'rxjs/operators';

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
    moods$: Observable<IMood[]>;
    activities$: Observable<IActivity[]>;
    private activities: IActivity[];




    datePickerObj: any = {
        toDate: new Date(), // default null
        showTodayButton: false, // default true
        closeOnSelect: true, // default false
        // disableWeekDays: [4], // default []
        mondayFirst: true, // default false
        setLabel: 'S',  // default 'Set'
        todayLabel: 'T', // default 'Today'
        closeLabel: 'C', // default 'Close'
        titleLabel: 'Select a Date', // default null
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        dateFormat: 'DD/MM/YYYY', // default dd MMM yyyy
        clearButton : false , // default true
    };


    constructor(private store: Store<AppState>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.store.dispatch(new MoodsRequestedWithCache());
        this.store.dispatch(new ActivitiesRequestedWithCache());
        this.activities$ = this.store.pipe(select(selectAllActivities));
        this.moods$ = this.store.pipe(select(selectAllMoods));
        this.entry$ = this.store.pipe(select(selectEntry));
        this.loadingSave$ = this.store.pipe(select(isEntryLoadingSave));
        this.createForm();
        // this.form.patchValue(this.data);
    }

    createForm() {
        this.form = this.fb.group({
            id: [''],
            mood: [null, Validators.required],
            date: ['', Validators.required],
            activities: new FormArray([], minSelectedCheckboxes(1))
        });
        this.createValidationMessages();

        this.activities$.pipe(take(2)).subscribe(res => {
            this.activities = res;
            const controls: FormControl[] = this.activities.map(c => new FormControl(false));
            // this.form.setControl('activities', this.fb.array(this.activities || []));
            this.form.setControl('activities', this.fb.array(controls));
        });
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
        const selectedOrderIds = this.form.value.activities
            .map((v, i) => v ? this.activities[i] : null)
            .filter(v => v !== null);
        const entry: IEntry = {...this.form.value, activities: selectedOrderIds, date: new Date(this.form.controls['date'].value)}
        this.store.dispatch(new EntrySaveRequested({entry: entry}));
    }

    getError(name: string) {
        const control = this.form.get(name);
        return this.validations.getControlErrors(control);
    }
}

function minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
        const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
            .map(control => control.value)
            // total up the number of checked checkboxes
            .reduce((prev, next) => next ? prev + next : prev, 0);

        // if the total is not greater than the minimum, return the error message
        return totalSelected >= min ? null : { required: true };
    };

    return validator;
}
