import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersRef = collection(this.firestore, 'users') as firebase.firestore.CollectionReference<User>;

  constructor(
    private firestore: Firestore,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    // Assuming email is unique, get the user with the matching email from the Firestore database
    const query = this.usersRef.where('email', '==', email).limit(1);
    const user$ = collectionData(query, { idField: 'id' }) as Observable<User[]>;

    // Attempt to log in with the given email and password
    return user$.pipe(
      // Check if the retrieved user exists and if their password matches the given password
      map((users) => {
        const user = users[0];
        if (user && user.password === password) {
          // Store the user's ID and navigate to the home page
          this.router.navigate(['/dashboard']);
        }
        return user;
      })
    );
  }

  logout() {
    // Remove the user's token and navigate to the login page
    this.router.navigate(['/login']);
  }
}
