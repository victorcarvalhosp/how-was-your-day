import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {IAuthentication} from '../models/authentication';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {fromPromise} from 'rxjs/internal-compatibility';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  login(data: IAuthentication): Observable<UserCredential> {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.identifier, data.password));
  }
}
