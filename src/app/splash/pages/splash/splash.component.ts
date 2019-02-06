import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {GetLoggedUser} from '../../../auth/actions/auth.actions';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.dispatch(new GetLoggedUser());
    // setTimeout(time => {
    //   this.router.navigate(['/auth']);
    // }, 2000);
  }

  ngOnInit() {
  }

}
