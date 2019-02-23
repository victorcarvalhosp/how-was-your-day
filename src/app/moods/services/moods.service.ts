import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {IMood} from '../models/mood';
import {from, Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {switchMap, take, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MoodsService {

    constructor(private db: AngularFirestore, private store: Store<AppState>) {

    }

    saveAllChangingOrder(moods: IMood[]): Observable<IMood[]> {
        return new Observable<IMood[]>(observer => {
            moods.forEach((mood, index) => {
                const reorderedMood = {...mood, order: index};
                return this.save(reorderedMood);
            });
        });
    }

    save(mood: IMood): Observable<IMood> {
        if (mood.id) {
            return from(this.db.collection(this.getPath()).doc(mood.id).update(mood)).pipe(map(() => mood));
        } else {
            const idBefore = this.db.createId();
            const moodWithId: IMood = {...mood, id: idBefore};
            return from(this.db.collection(this.getPath()).doc(idBefore).set(moodWithId)).pipe(map(() => moodWithId
            ));
        }
    }

    findAll(): Observable<IMood[]> {
      return  this.db.collection<IMood>(this.getPath()).valueChanges().pipe(take(1));
    }

    getPath(): string {
        return `users/${localStorage.getItem('token')}/moods/`;
    }
}
