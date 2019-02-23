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
        // This is wrong, because I want to return the moods that this.save return...
        const reorderedMoods: IMood[] = [];
        return new Observable<IMood[]>(observer => {
            moods.forEach((mood, index) => {
                const reorderedMood = {...mood, order: index};
                this.save(reorderedMood).pipe(map(res => res))
                reorderedMoods.push(reorderedMood);
            });
            observer.next(reorderedMoods);
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
