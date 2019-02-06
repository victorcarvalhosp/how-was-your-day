import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTE_ACTIVITIES, ROUTE_AUTH} from '../../shared/router/routes.constants';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {Logout} from '../../auth/actions/auth.actions';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage {

    constructor(private router: Router, private store: Store<AppState>) {

    }

    logout() {
        //TODO
        this.store.dispatch(new Logout());
        this.router.navigate([ROUTE_AUTH]);
    }

    goToActivities() {
        this.router.navigate([ROUTE_ACTIVITIES]);

    }
}
