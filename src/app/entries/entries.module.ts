import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EntriesPage} from './pages/entries.page';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {entriesReducer} from './reducers/entries.reducer';
import {EntriesEffects} from './effects/entries.effects';
import {MoodsPipesModule} from '../moods/pipes/moods-pipes.module';
import {ActivitiesPipesModule} from '../activities/pipes/activities-pipes.module';


export const entriesRoutes: Routes = [
    {
        path: '',
        component: EntriesPage

    },
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        MoodsPipesModule,
        ActivitiesPipesModule,
        RouterModule.forChild(entriesRoutes),
        EffectsModule.forFeature([EntriesEffects]),
        StoreModule.forFeature('entries', entriesReducer),
    ],
    declarations: [EntriesPage]
})
export class EntriesModule {
}
