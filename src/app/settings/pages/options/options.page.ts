import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: 'options.page.html',
    styleUrls: ['options.page.scss']
})
export class OptionsPage {

    constructor(private router: Router) {

    }

    logout() {
        //TODO
        this.router.navigate(['/auth']);
    }

    goToActivities() {
        this.router.navigate(['/home/tabs/settings/activities']);

    }
}
