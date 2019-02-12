import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {from, Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {take} from 'rxjs/operators';
import {IActivity} from '../../activities/models/activity';
import {IEntry} from '../models/entry';
import {IPeriod} from '../../period/models/period';

@Injectable({
    providedIn: 'root'
})
export class EntriesService {

    constructor(private db: AngularFirestore, private store: Store<AppState>) {

    }

    save(entry: IEntry): Observable<void> {
        if (entry.id) {
            return from(this.db.collection(this.getPath()).doc(entry.id).update(entry));
        } else {
            const idBefore = this.db.createId();
            const entryWithId: IEntry = {...entry, id: idBefore};
            return from(this.db.collection(this.getPath()).doc(idBefore).set(entryWithId));
        }
    }

    findAll(): Observable<IEntry[]> {
      return  this.db.collection<IEntry>(this.getPath()).valueChanges().pipe(take(1));
    }

    findByPeriod(period: IPeriod): Observable<IEntry[]> {
        return  this.db.collection<IEntry>(this.getPath(),
            ref => ref.where('date', '<=', period.endDate)
                .where('date', '>=', period.startDate)).valueChanges().pipe(take(1));
    }

    getPath(): string {
        return `users/${localStorage.getItem('token')}/entries/`;
    }
}
