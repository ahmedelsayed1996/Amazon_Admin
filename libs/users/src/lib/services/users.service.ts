import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import * as countriesLib from 'i18n-iso-countries';
 declare const require:any
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    let $usersRef = collection(this.firestore, "users");
    return collectionData($usersRef, {idField: "id"}) as Observable<User[]>;
  }

  getUser(userId: string): Observable<User> {
    let $userRef = doc(this.firestore, "users/" + userId);
    return docData($userRef, {idField: "id"}) as Observable<User>;
  }

  createUser(user: User): Promise<any> {
    let $usersRef = collection(this.firestore, "users");
    let { id, ...userData } = user; 
    return addDoc($usersRef, userData);
  }

  updateUser(user: User): Promise<any> {
    let $userRef = doc(this.firestore, "users/" + user.id);
    return setDoc($userRef, user);
  }

  deleteUser(userId: string): Promise<any> {
    let $userRef = doc(this.firestore, "users/" + userId);
    return deleteDoc($userRef);
  }

  getCountries(): { id: string; name: string }[] {

    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
              id: entry[0],
              name: entry[1]
            };
         });  }
         getCountry(countryKey: string): string {
          if (!countryKey) {
            return '';
          }
          const countryName = countriesLib.getName(countryKey, 'en');
          return countryName ? countryName : '';
        }
        
}
