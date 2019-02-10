import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {IMood} from '../models/mood';
import {from, Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MoodsService {

    constructor(private db: AngularFirestore, private store: Store<AppState>) {

    }

    save(mood: IMood): Observable<void> {
        if (mood.id) {
            return from(this.db.collection(this.getPath()).doc(mood.id).update(mood));
        } else {
            const idBefore = this.db.createId();
            const moodWithId: IMood = {...mood, id: idBefore};
            return from(this.db.collection(this.getPath()).doc(idBefore).set(moodWithId));
        }
    }

    findAll(): Observable<IMood[]> {
      return  this.db.collection<IMood>(this.getPath()).valueChanges().pipe(take(1));
    }

    getPath(): string {
        return `users/${localStorage.getItem('token')}/moods/`;
    }
}
