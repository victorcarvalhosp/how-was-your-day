import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPage} from './pages/settings.page';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


export const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsPage

    },
];

@NgModule({
    declarations: [SettingsPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(settingsRoutes),

    ],
    exports: [SettingsPage]
})
export class SettingsModule {
}
