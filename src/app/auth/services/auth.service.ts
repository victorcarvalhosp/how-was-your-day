import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {IAuthentication} from '../models/authentication';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(data: IAuthentication): Observable<string> {

    // Do something you like to validate the credentials
    // Eg, Call the API -> subscribe -> check -> hanlde error ... etc
    const valid = true;
    if (!valid) {
      throwError('Invalid credentials');
    }

    // Pretending all good, return the username
    return of('Sun,Yat-Sen');
  }
}
