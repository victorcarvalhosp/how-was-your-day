import {Injectable} from '@angular/core';
import {from, Observable, of, throwError} from 'rxjs';
import {IAuthentication} from '../models/authentication';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap, take} from 'rxjs/operators';
import {IUser} from '../models/user';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    }

    login(data: IAuthentication): Observable<UserCredential> {
        return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.identifier, data.password));
    }

    register(data: IAuthentication): Observable<any> {
        console.log('SERVICE REGISTER')
        return from(this.afAuth.auth.createUserWithEmailAndPassword(data.identifier, data.password)).pipe(take(1),
            switchMap(res => {
                const user: IUser = {
                    uid: res.user.uid,
                    email: res.user.email,
                    creationDate: new Date()
                };
                return this.createUser(user);
            }));

    }

    createUser(user: IUser): Observable<void> {
        return from(this.db.collection<IUser>('users').doc(user.uid).set(user));
    }
}
