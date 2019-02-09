import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivitiesComponent} from './pages/activities.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ActivitiesEffects} from './effects/activities.effects';
import {activitiesReducer} from './reducers/activities.reducer';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';

export const activitiesRoutes: Routes = [
  {
    path: '',
    component: ActivitiesComponent

  },
  {
    path: 'create',
    component: CreateActivityComponent
  }
];
@NgModule({
  declarations: [ActivitiesComponent, CreateActivityComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(activitiesRoutes),
    EffectsModule.forFeature([ActivitiesEffects]),
    StoreModule.forFeature('activities', activitiesReducer),
  ]
})
export class ActivitiesModule { }
