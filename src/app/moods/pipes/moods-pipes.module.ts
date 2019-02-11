import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoodIconPipe} from './mood-icon.pipe';


@NgModule({
    declarations: [MoodIconPipe],
    imports: [
        CommonModule,
    ],
    exports: [MoodIconPipe]
})
export class MoodsPipesModule {
}
