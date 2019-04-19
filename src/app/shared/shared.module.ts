import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResponsiveAreaComponent} from './components/responsive-area/responsive-area.component';
import {IonicModule} from '@ionic/angular';
import {ConnectFormDirectiveDirective} from './forms/connect-form-directive.directive';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {ColorPickerComponent} from './components/color-picker/color-picker.component';

@NgModule({
    declarations: [ResponsiveAreaComponent, ConnectFormDirectiveDirective, ColorPickerComponent],
    imports: [
        CommonModule,
        IonicModule,
        FontAwesomeModule,
    ],
    exports: [ResponsiveAreaComponent, ConnectFormDirectiveDirective, FontAwesomeModule, ColorPickerComponent]
})
export class SharedModule {
    constructor() {
        library.add(fas, far);
    }
}
