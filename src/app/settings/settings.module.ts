import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionsPage} from './pages/options/options.page';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ActivitiesComponent} from './pages/activities/activities.component';
import {SharedModule} from '../shared/shared.module';


export const settingsRoutes: Routes = [
    {
        path: '',
        component: OptionsPage

    },
    {
        path: 'activities',
        component: ActivitiesComponent

    }
];

@NgModule({
    declarations: [OptionsPage, ActivitiesComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(settingsRoutes),

    ],
    exports: [OptionsPage]
})
export class SettingsModule {
}
