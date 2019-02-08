import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {select, Store} from '@ngrx/store';
import {IActivity} from '../models/activity';
import {getLoggedUserUid} from '../../auth/selectors/auth.selectors';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {

    constructor(private db: AngularFirestore, private store: Store<AppState>) {

    }

    findAll(): Observable<IActivity[]> {
      return  this.db.collection<IActivity>(this.getPath()).valueChanges();
    }

    getPath(): string {
        return `users/${localStorage.getItem('token')}/activities/`;
    }
}
