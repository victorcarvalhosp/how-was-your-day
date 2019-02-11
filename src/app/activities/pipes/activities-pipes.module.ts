import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityIconPipe} from './activity-icon.pipe';


@NgModule({
    declarations: [ActivityIconPipe],
    imports: [
        CommonModule,
    ],
    exports: [ActivityIconPipe]
})
export class ActivitiesPipesModule {
}
