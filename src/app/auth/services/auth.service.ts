import {Injectable} from '@angular/core';
import {from, Observable, of, throwError} from 'rxjs';
import {IAuthentication} from '../models/authentication';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {IUser} from '../models/user';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    }

    login(data: IAuthentication): Observable<IUser> {
        return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.identifier, data.password)).pipe(
            tap(user => localStorage.setItem('token', user.user.uid)),
            switchMap(auth => {
                return this.getLoggedInUser();
            })
        );
    }

    register(data: IAuthentication): Observable<any> {
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

    getLoggedInUser(): Observable<IUser> {
        const token = localStorage.getItem('token');
        if (token) {
            return this.db.doc<IUser>(`users/${token}`).valueChanges();
        } else {
            return of(null);
        }
        // return this.afAuth.authState.pipe(
        //     switchMap(user => {
        //         if (user) {
        //             if (user.id) {
        //                 return this.db.doc<IUser>(`users/${user.id}`).valueChanges();
        //             }
        //         } else {
        //             console.log('return null');
        //             return of(null);
        //         }
        //     })
        // );
    }

    logout(): Observable<any> {
        return fromPromise(this.afAuth.auth.signOut()).pipe(
            tap(() => {
                localStorage.removeItem('token');
            }));
    }

    createUser(user: IUser): Observable<void> {
        return from(this.db.collection<IUser>('users').doc(user.uid).set(user));
    }
}
