import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {select, Store} from '@ngrx/store';
import {IActivity} from '../models/activity';
import {getLoggedUserUid} from '../../auth/selectors/auth.selectors';
import {from, Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {

    constructor(private db: AngularFirestore, private store: Store<AppState>) {

    }

    save(activity: IActivity): Observable<IActivity> {
        if (activity.id) {
            return from(this.db.collection(this.getPath()).doc(activity.id).update(activity)).pipe(map(() => activity));
        } else {
            const idBefore = this.db.createId();
            const activityWithId: IActivity = {...activity, id: idBefore};
            return from(this.db.collection(this.getPath()).doc(idBefore).set(activityWithId)).pipe(map(() => activityWithId));
        }
    }

    findAll(): Observable<IActivity[]> {
      return  this.db.collection<IActivity>(this.getPath()).valueChanges().pipe(take(1));
    }

    remove(id: string): Observable<void> {
        return from(this.db.collection(this.getPath()).doc(id).delete());
    }

    getPath(): string {
        return `users/${localStorage.getItem('token')}/activities/`;
    }
}
